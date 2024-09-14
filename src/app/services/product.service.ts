import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Product, ProductResponse } from '../features/products/product.types';
import { mappingProduct } from '../features/products/products.model';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly storageKey = 'productsData';
	#productsSubject = new BehaviorSubject<Product[]>([]);

	#apiService = inject(ApiService);
	#localStorageService = inject(LocalStorageService);

	constructor() {
		this.loadInitialData();
	}

	private loadInitialData(): void {
		const storedProducts = this.#localStorageService.getItem<Product[]>(this.storageKey);
		if (storedProducts) {
			this.#productsSubject.next(storedProducts);
		} else {
			this.fetchProductsFromApi('2478868012').subscribe();
		}
	}

	private fetchProductsFromApi(keyword: string): Observable<Product[]> {
		return this.#apiService.getProductsByCategory(keyword).pipe(
			map((data: ProductResponse) => mappingProduct(data.data.products)),
			map((mappedData) => (Array.isArray(mappedData) ? mappedData : [mappedData])),
			tap((productArray) => {
				this.#localStorageService.setItem(this.storageKey, productArray);
				this.#productsSubject.next(productArray);
			})
		);
	}

	getProducts(): Observable<Product[]> {
		return this.#productsSubject.asObservable();
	}

	addProduct(product: Product): void {
		const products = [...this.#productsSubject.value, product];
		this.updateProducts(products);
	}

	updateProduct(updatedProduct: Product): void {
		const products = this.#productsSubject.value.map((product) =>
			product.asin === updatedProduct.asin ? updatedProduct : product
		);
		this.updateProducts(products);
	}

	deleteProduct(productId: string = ''): void {
		console.log(productId);
		const products = this.#productsSubject.value.filter((product) => product.asin !== productId);
		this.updateProducts(products);
	}

	resetProducts(): void {
		this.#localStorageService.removeItem(this.storageKey);
		this.fetchProductsFromApi('2478868012').subscribe();
	}

	private updateProducts(products: Product[]): void {
		console.log(products);
		this.#productsSubject.next(products);
		this.#localStorageService.setItem(this.storageKey, products);
	}
}

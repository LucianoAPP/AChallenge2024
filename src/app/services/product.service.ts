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
	readonly #storageKey = 'productsData';
	#productsSubject = new BehaviorSubject<Product[]>([]);
	readonly #categoryProduyt = '2478868012';

	#apiService = inject(ApiService);
	#localStorageService = inject(LocalStorageService);

	constructor() {
		this.loadInitialData();
	}

	private loadInitialData(): void {
		const storedProducts = this.#localStorageService.getItem<Product[]>(this.#storageKey);
		if (storedProducts) {
			this.#productsSubject.next(storedProducts);
		} else {
			this.fetchProductsFromApi(this.#categoryProduyt).subscribe();
		}
	}

	private fetchProductsFromApi(keyword: string): Observable<Product[]> {
		return this.#apiService.getProductsByCategory(keyword).pipe(
			map((data: ProductResponse) => mappingProduct(data.data.products)),
			map((mappedData) => mappedData),
			tap((productArray) => {
				this.#localStorageService.setItem(this.#storageKey, productArray);
				this.#productsSubject.next(productArray);
			})
		);
	}

	getProducts(): Observable<Product[]> {
		return this.#productsSubject.asObservable();
	}

	addProduct(newProduct: Product): void {
		const products = [newProduct, ...this.#productsSubject.value];
		this.updateProducts(products);
	}

	updateProduct(updatedProduct: Product): void {
		const products = this.#productsSubject.value.map((product) =>
			product.asin === updatedProduct.asin ? updatedProduct : product
		);
		this.updateProducts(products);
	}

	deleteProduct(productId: string = ''): void {
		const products = this.#productsSubject.value.filter((product) => product.asin !== productId);
		this.updateProducts(products);
	}

	resetProducts(): void {
		this.#localStorageService.removeItem(this.#storageKey);
		this.fetchProductsFromApi(this.#categoryProduyt).subscribe();
	}

	private updateProducts(products: Product[]): void {
		this.#productsSubject.next(products);
		this.#localStorageService.setItem(this.#storageKey, products);
	}
}

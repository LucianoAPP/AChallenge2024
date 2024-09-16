import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterValues, Product } from '../../../features/products/product.types';
import { MatInputModule } from '@angular/material/input';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ProductModalComponent,
		ProductCardSkeletonComponent,
		ProductCardComponent,
		ProductFiltersComponent
	]
})
export class ProductListComponent implements OnInit {
	productService = inject(ProductService);
	private dialog = inject(MatDialog);

	products$: Observable<Product[]> | undefined;
	productsSubject = new BehaviorSubject<Product[]>([]);
	#filtersSubject = new BehaviorSubject<FilterValues>({
		search: '',
		minPrice: 0,
		maxPrice: 1000,
		minRating: 0,
		maxRating: 5
	});

	ngOnInit(): void {
		this.productService
			.getProducts()
			.pipe(startWith([] as Product[]))
			.subscribe((products) => {
				this.productsSubject.next(products);
			});
		const filters$ = this.#filtersSubject.asObservable();
		this.products$ = combineLatest([this.productsSubject.asObservable(), filters$]).pipe(
			map(([products, filters]) =>
				products.filter((product) => this.filterProduct(product, filters))
			)
		);
	}

	private filterProduct(product: Product, filters: FilterValues): boolean {
		const matchesSearch =
			product.product_title?.toLowerCase().includes(filters.search.toLowerCase()) || false;

		const withinPriceRange =
			product.product_price != null &&
			product.product_price >= filters.minPrice &&
			product.product_price <= filters.maxPrice;

		const ratingValue = product.product_star_rating || 0;
		const withinRatingRange = ratingValue >= filters.minRating && ratingValue <= filters.maxRating;

		return matchesSearch && withinPriceRange && withinRatingRange;
	}

	openProductModal(product?: Product): void {
		this.dialog
			.open(ProductModalComponent, {
				width: '400px',
				data: { product },
				disableClose: true
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					if (product) {
						this.productService.updateProduct(result);
					} else {
						this.productService.addProduct(result);
					}
				}
			});
	}

	editProduct(product: Product): void {
		this.openProductModal(product);
	}

	deleteProduct(product: Product): void {
		this.dialog
			.open(ConfirmModalComponent, {
				data: {
					title: 'Eliminar producto',
					body: '¿Estas seguro que desea eliminar el producto.?',
					ok: 'Si',
					cancel: 'No'
				}
			})
			.afterClosed()
			.subscribe(async (confirmed) => {
				if (confirmed !== 'confirmed') return;
				this.productService.deleteProduct(product.asin);
			});
	}

	resetProducts(): void {
		this.productsSubject.next([]);
		this.productService.resetProducts();
	}

	onFiltersChanged(filters: FilterValues): void {
		this.#filtersSubject.next(filters);
	}
}

import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';
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

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
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
	products$: Observable<Product[]> | undefined;
	#filtersSubject = new BehaviorSubject<FilterValues>({
		search: '',
		minPrice: 0,
		maxPrice: 1000,
		minRating: 0,
		maxRating: 5
	});

	constructor(
		private fb: NonNullableFormBuilder,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		const products$ = this.productService.getProducts().pipe(startWith([] as Product[]));
		const filters$ = this.#filtersSubject.asObservable();
		this.products$ = combineLatest([products$, filters$]).pipe(
			map(([products, filters]) =>
				products.filter((product) => {
					const matchesSearch = product.product_title
						?.toLowerCase()
						.includes(filters.search.toLowerCase());
					const withinPriceRange =
						product.product_price >= filters.minPrice && product.product_price <= filters.maxPrice;
					const ratingValue = product.product_star_rating || 0;
					const withinRatingRange =
						ratingValue >= filters.minRating && ratingValue <= filters.maxRating;
					return matchesSearch && withinPriceRange && withinRatingRange;
				})
			),
			tap((data) => {
				console.log(data);
			})
		);
	}

	openProductModal(product?: Product): void {
		const dialogRef = this.dialog.open(ProductModalComponent, {
			width: '400px',
			data: { product },
			disableClose: true
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log(result);
				console.log(product);
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
		this.productService.deleteProduct(product.asin);
	}

	resetProducts(): void {
		this.productService.resetProducts();
	}

	onFiltersChanged(filters: FilterValues): void {
		this.#filtersSubject.next(filters);
	}
}

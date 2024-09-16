import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';

@Component({
	selector: 'app-products',
	template: `<app-product-list></app-product-list>`,
	standalone: true,
	imports: [ProductListComponent]
})
export class ProductsComponent {
	apiService = inject(ProductService);
}

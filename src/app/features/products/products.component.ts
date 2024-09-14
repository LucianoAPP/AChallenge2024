import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	standalone: true,
	imports: [ProductListComponent],
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
	apiService = inject(ProductService);

	constructor() {}
}

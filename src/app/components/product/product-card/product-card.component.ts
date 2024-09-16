import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../features/products/product.types';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { SanitizeUrlPipe } from './sanitizeUrl.pipe';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		StarRatingComponent,
		SanitizeUrlPipe
	]
})
export class ProductCardComponent {
	@Input({ required: true }) product!: Product;
	@Output() edit = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	onEdit(): void {
		this.edit.emit(this.product);
	}

	onDelete(): void {
		this.delete.emit(this.product);
	}
}

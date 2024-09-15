import { Component, Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialog
} from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../features/products/product.types';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
	selector: 'app-product-modal',
	templateUrl: './product-modal.component.html',
	styleUrls: ['./product-modal.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule
	]
})
export class ProductModalComponent {
	productForm: FormGroup;
	#isFormDirty: boolean = false;
	constructor(
		private fb: NonNullableFormBuilder,
		private dialogRef: MatDialogRef<ProductModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { product: Product },
		private dialog: MatDialog
	) {
		this.productForm = this.fb.group({
			product_title: [data.product?.product_title || '', Validators.required],
			product_price: [data.product?.product_price || 0, [Validators.required, Validators.min(0)]],
			product_photo: [data.product?.product_photo || '', Validators.required],
			product_star_rating: [
				data.product?.product_star_rating || 0,
				[Validators.required, Validators.min(0), Validators.max(5)]
			]
		});
		this.productForm.valueChanges.subscribe(() => {
			this.#isFormDirty = true;
		});
	}

	save(): void {
		if (this.productForm.valid) {
			const product: Product = {
				asin: this.data.product?.asin || this.generateId(),
				...this.productForm.value
			};
			this.dialogRef.close(product);
		}
	}

	close(): void {
		if (this.#isFormDirty) {
			this.dialog
				.open(ConfirmModalComponent, {
					data: {
						title: 'Tienes cambios sin guardar',
						body: '¿Estás seguro de que deseas salir?',
						ok: 'Si',
						cancel: 'No'
					}
				})
				.afterClosed()
				.subscribe(async (confirmed) => {
					if (confirmed !== 'confirmed') return;
					this.dialogRef.close();
				});
		} else {
			this.dialogRef.close();
		}
	}

	private generateId(): string {
		return Date.now().toString();
	}
}

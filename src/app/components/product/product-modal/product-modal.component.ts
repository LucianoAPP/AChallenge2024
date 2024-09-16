import { Component, inject, OnInit } from '@angular/core';
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
import { urlValidator } from './product-custom-validators';

@Component({
	selector: 'app-product-modal',
	templateUrl: './product-modal.component.html',
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
export class ProductModalComponent implements OnInit {
	readonly #fb = inject(NonNullableFormBuilder);
	#dialog = inject(MatDialog);
	#dialogRef: MatDialogRef<ProductModalComponent> = inject(MatDialogRef);
	data: { product: Product } = inject(MAT_DIALOG_DATA);
	productForm: FormGroup = this.#fb.group({
		product_title: ['', Validators.required],
		product_price: [0, [Validators.required, Validators.min(0)]],
		product_photo: ['', [Validators.required, urlValidator()]],
		product_star_rating: [
			this.data.product?.product_star_rating || 0,
			[Validators.required, Validators.min(0), Validators.max(5)]
		]
	});
	#isFormDirty = false;

	ngOnInit(): void {
		if (this.data.product) this.setData(this.data.product);
		this.productForm.valueChanges.subscribe(() => {
			this.#isFormDirty = true;
		});
	}

	setData(productData: Product): void {
		const productValues = {
			product_title: productData?.product_title,
			product_price: productData?.product_price,
			product_photo: productData?.product_photo,
			product_star_rating: productData?.product_star_rating
		};
		this.productForm.patchValue(productValues);
	}

	save(): void {
		if (this.productForm.valid) {
			const product: Product = {
				asin: this.data.product?.asin || this.generateId(),
				...this.productForm.value
			};
			this.#dialogRef.close(product);
		}
	}

	close(): void {
		if (this.#isFormDirty) {
			this.#dialog
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
					this.#dialogRef.close();
				});
		} else {
			this.#dialogRef.close();
		}
	}

	private generateId(): string {
		return Date.now().toString();
	}
}

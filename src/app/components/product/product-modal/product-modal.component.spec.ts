import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModalComponent } from './product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ProductModalComponent', () => {
	let component: ProductModalComponent;
	let fixture: ComponentFixture<ProductModalComponent>;
	let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ProductModalComponent>>;
	const mockDialogData = { product: null };

	beforeEach(async () => {
		const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close', 'beforeClosed']);
		dialogRefSpyObj.beforeClosed.and.returnValue(of(true));

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, BrowserAnimationsModule, ProductModalComponent],
			providers: [
				{ provide: MatDialogRef, useValue: dialogRefSpyObj },
				{ provide: MAT_DIALOG_DATA, useValue: mockDialogData }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductModalComponent);
		component = fixture.componentInstance;
		dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
			MatDialogRef<ProductModalComponent>
		>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the form with default values', () => {
		expect(component.productForm).toBeDefined();
		expect(component.productForm.get('product_title')!.value).toBe('');
		expect(component.productForm.get('product_price')!.value).toBe(0);
		expect(component.productForm.get('product_photo')!.value).toBe('');
		expect(component.productForm.get('product_star_rating')!.value).toBe(0);
	});

	it('should not close the dialog when form is invalid', () => {
		component.productForm.get('product_title')!.setValue('');
		component.productForm.get('product_price')!.setValue(-10);
		component.save();
		expect(dialogRefSpy.close).not.toHaveBeenCalled();
	});

	it('should close the dialog and return product data when form is valid', () => {
		component.productForm.get('product_title')!.setValue('Producto de Prueba');
		component.productForm.get('product_price')!.setValue(100);
		component.productForm.get('product_photo')!.setValue('http://imagen.com/producto.jpg');
		component.productForm.get('product_star_rating')!.setValue(4.5);
		component.save();
		expect(dialogRefSpy.close).toHaveBeenCalledWith(
			jasmine.objectContaining({
				product_title: 'Producto de Prueba',
				product_price: 100,
				product_photo: 'http://imagen.com/producto.jpg',
				product_star_rating: 4.5
			})
		);
	});
});

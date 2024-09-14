import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFiltersComponent } from './product-filters.component';

describe('ProductFiltersComponent', () => {
	let component: ProductFiltersComponent;
	let fixture: ComponentFixture<ProductFiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ProductFiltersComponent,
				ReactiveFormsModule,
				MatCardModule,
				MatFormFieldModule,
				MatInputModule,
				MatButtonModule,
				BrowserAnimationsModule
			],
			providers: [
				{
					provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
					useValue: { appearance: 'fill' }
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize the filter form with default values', () => {
		expect(component.filterForm).toBeDefined();
		const formValues = component.filterForm.value;
		expect(formValues.search).toBe('');
		expect(formValues.minPrice).toBe(0);
		expect(formValues.maxPrice).toBe(1000);
		expect(formValues.minRating).toBe(0);
		expect(formValues.maxRating).toBe(5);
	});

	it('should emit filtersChanged event on initialization', () => {
		spyOn(component.filtersChanged, 'emit');
		component.ngOnInit();
		expect(component.filtersChanged.emit).toHaveBeenCalledWith(component.filterForm.value);
	});

	it('should emit filtersChanged event when form values change after debounceTime', fakeAsync(() => {
		spyOn(component.filtersChanged, 'emit');

		component.filterForm.get('search')!.setValue('Debounce Test');

		tick(300);

		expect(component.filtersChanged.emit).toHaveBeenCalledTimes(1);
	}));

	it('should invalidate minRating if value is greater than 5', () => {
		const minRatingControl = component.filterForm.get('minRating')!;
		minRatingControl.setValue(6);
		expect(minRatingControl.valid).toBeFalse();
		expect(minRatingControl.hasError('max')).toBeTrue();
	});

	it('should invalidate maxRating if value is less than 0', () => {
		const maxRatingControl = component.filterForm.get('maxRating')!;
		maxRatingControl.setValue(-1);
		expect(maxRatingControl.valid).toBeFalse();
		expect(maxRatingControl.hasError('min')).toBeTrue();
	});
});

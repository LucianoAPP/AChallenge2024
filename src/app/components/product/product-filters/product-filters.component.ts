import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { FilterValues } from '../../../features/products/product.types';

@Component({
	selector: 'app-product-filters',
	templateUrl: './product-filters.component.html',
	styleUrls: ['./product-filters.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	]
})
export class ProductFiltersComponent implements OnInit {
	@Output() filtersChanged = new EventEmitter<FilterValues>();

	filterForm: FormGroup = this.fb.group({
		search: [''],
		minPrice: [0],
		maxPrice: [1000],
		minRating: [0, [Validators.min(0), Validators.max(5)]],
		maxRating: [5, [Validators.min(0), Validators.max(5)]]
	});

	constructor(private fb: NonNullableFormBuilder) {}
	ngOnInit(): void {
		this.emitFilters();
		this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => this.emitFilters());
	}

	private emitFilters(): void {
		this.filtersChanged.emit(this.filterForm.value);
	}
}

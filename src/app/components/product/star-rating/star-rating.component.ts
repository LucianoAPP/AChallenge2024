import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.scss'],
	standalone: true
})
export class StarRatingComponent implements OnInit, OnChanges {
	@Input() rating: number = 0;

	fullStars: number[] = [];
	emptyStars: number[] = [];
	hasHalfStar: boolean = false;

	ngOnInit(): void {
		this.calculateStars();
	}

	ngOnChanges(): void {
		this.calculateStars();
	}

	private calculateStars(): void {
		const fullStarsCount = Math.floor(this.rating);
		const hasHalfStar = this.rating - fullStarsCount >= 0.5;
		const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

		this.fullStars = Array(fullStarsCount).fill(0);
		this.hasHalfStar = hasHalfStar;
		this.emptyStars = Array(emptyStarsCount).fill(0);
	}
}

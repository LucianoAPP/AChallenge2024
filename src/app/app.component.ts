import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent],
	template: `
		<div class="max-w-screen-xl mx-auto px-5">
			<app-header></app-header>
			<router-outlet></router-outlet>
		</div>
	`
})
export class AppComponent {
	title = 'Nisum-Challenge';
}

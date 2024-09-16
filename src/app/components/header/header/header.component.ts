import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `<header class="flex flex-col lg:flex-row items-center my-5 justify-center">
		<div class="flex w-full lg:w-auto items-center justify-between">
			<span class="text-3xl font-bold text-slate-800 pr-1">Nisum -</span>
			<span class="text-3xl text-slate-500"> Challenge 2024</span>
		</div>
	</header>`,
	standalone: true
})
export class HeaderComponent {}

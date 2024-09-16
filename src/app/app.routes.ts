import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
	{
		path: '',
		component: ProductsComponent,
		title: 'Nisum - Challenge'
	},
	{
		path: '**',
		loadComponent: () => import('./features/not-found-page/not-found-page.component')
	}
];

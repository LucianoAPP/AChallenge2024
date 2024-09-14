import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductResponse } from '../features/products/product.types';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly url = environment.amazonDataApiUrl;
	private readonly headers = {
		'X-RapidAPI-Key': environment.rapidAmazonAPIKey,
		'X-RapidAPI-Host': environment.rapidAmazonAPIHost
	};

	#http = inject(HttpClient);

	getProductsByCategory(params: string): Observable<ProductResponse> {
		const paramst = new HttpParams().set('category_id', params);
		return this.#http.get<ProductResponse>(`${this.url}/products-by-category`, {
			headers: this.headers,
			params: paramst as HttpParams
		});
	}
}

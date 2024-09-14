import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	getItem<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : null;
	}

	setItem<T>(key: string, data: T): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}

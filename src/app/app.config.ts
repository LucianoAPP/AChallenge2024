import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiQuotaInterceptorFn } from './core/interceptors/api-quota.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([ApiQuotaInterceptorFn])),
		importProvidersFrom(HttpClientModule)
	]
};

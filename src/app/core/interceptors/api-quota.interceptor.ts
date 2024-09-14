import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export const ApiQuotaInterceptorFn: HttpInterceptorFn = (req, next) => {
	const snackBar = inject(MatSnackBar);
	return next(req).pipe(catchError((error: HttpErrorResponse) => handleError(error, snackBar)));
};

const handleError = (error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> => {
	if (error instanceof HttpErrorResponse) {
		if (error.status === 429) {
			const message = error.error.message;
			showQuotaExceededMessage(snackBar, message);
		}
	}
	return throwError(() => error);
};

const showQuotaExceededMessage = (snackBar: MatSnackBar, message: string): void => {
	snackBar.open(message, 'Cerrar', {
		duration: 10000
	});
};

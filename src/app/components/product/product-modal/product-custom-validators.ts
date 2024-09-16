import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidUrl } from '../../../utils/utils';

export function urlValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) {
			return null;
		}
		return isValidUrl(value) ? null : { invalidUrl: true };
	};
}

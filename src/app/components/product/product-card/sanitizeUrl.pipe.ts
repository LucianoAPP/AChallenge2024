import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { isValidUrl } from '../../../utils/utils';

@Pipe({
	name: 'sanitizeUrl',
	standalone: true
})
export class SanitizeUrlPipe implements PipeTransform {
	private defaultImage: string = 'assets/product-not.png';

	constructor(private sanitizer: DomSanitizer) {}

	transform(url?: string): SafeUrl {
		const validUrl = isValidUrl(url) ? url : this.defaultImage;
		return this.sanitizer.bypassSecurityTrustUrl(validUrl!);
	}
}

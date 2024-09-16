import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmModalData {
	title: string;
	body: string;
	bodyBold?: string;
	ok?: string;
	cancel?: string;
}

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent implements OnInit {
	#dialogRef: MatDialogRef<ConfirmModalComponent> = inject(MatDialogRef);
	data: ConfirmModalData = inject(MAT_DIALOG_DATA);

	ngOnInit() {
		this.data.ok = this.data.ok || 'Confirm';
		this.data.cancel = this.data.cancel || undefined;
	}

	public close(result: 'confirmed' | 'cancelled'): void {
		this.#dialogRef.close(result);
	}
}

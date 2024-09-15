import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
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
	styleUrls: ['./confirm-modal.component.scss'],
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<ConfirmModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmModalData
	) {}

	ngOnInit() {
		this.data.ok = this.data.ok || 'Confirm';
		this.data.cancel = this.data.cancel || undefined;
	}

	public close(result: 'confirmed' | 'cancelled') {
		this.dialogRef.close(result);
	}
}

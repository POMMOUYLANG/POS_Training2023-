// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

    ngOnInit(): void {}
    close(result: any): void {
        this.dialogRef.close(result);
    }
}

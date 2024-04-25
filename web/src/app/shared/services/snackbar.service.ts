// ==========================================================>> Core Library
import { Injectable } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackbar: MatSnackBar) {}

    openSnackBar(message: string, action: string): any {
        if (action === 'error') {
            this.snackbar.open(message, '', {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                duration: 3000,
                panelClass: ['black-snackbar'],
            });
        } else {
            this.snackbar.open(message, '', {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                duration: 3000,
                panelClass: ['green-snackbar'],
            });
        }
    }
}

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationConfig } from 'helpers/services/confirmation/confirmation.types';

@Component({
    selector     : 'confirmation-dialog',
    templateUrl  : './dialog.component.html',
    styles       : [
        `
            .confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent
{
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationConfig)
    {
    }

}

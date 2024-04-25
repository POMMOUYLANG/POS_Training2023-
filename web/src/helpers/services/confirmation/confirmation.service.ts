// ==========================================================>> Core Library
import { Injectable } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';

// ==========================================================>> Custom Library
import { ConfirmationDialogComponent } from 'helpers/services/confirmation/dialog/dialog.component';
import { ConfirmationConfig } from 'helpers/services/confirmation/confirmation.types';

@Injectable()
export class ConfirmationService
{
    private _defaultConfig: ConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn'
            },
            cancel : {
                show : true,
                label: 'Cancel'
            }
        },
        dismissible: false
    };

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: ConfirmationConfig = {}): MatDialogRef<ConfirmationDialogComponent>
    {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(ConfirmationDialogComponent, {
            autoFocus   : false,
            disableClose: !userConfig.dismissible,
            data        : userConfig,
            panelClass  : 'confirmation-dialog-panel'
        });
    }
}

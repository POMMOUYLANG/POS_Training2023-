// ==========================================================>> Core Library
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    NgForm,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { LoadingService } from 'helpers/services/loading';
import { MyProfileService } from '../my-profile.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
    @ViewChild('changePasswordNgForm') changePasswordNgForm: NgForm;

    changePasswordForm: UntypedFormGroup;
    saving: boolean = false;

    constructor(
        private _serviceMyProfile: MyProfileService,
        private _formBuilder: UntypedFormBuilder,
        private _snackBar: SnackbarService,
        private loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.changePasswordForm = this._formBuilder.group({
            old_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
            ],
            new_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
            ],
            confirm_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
            ],
        });
    }

    changePassword(): void {
        // Return if the form is invalid
        if (this.changePasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.changePasswordForm.disable();

        // Send the request to the server
        this.loadingService.show();
        this.saving = true;
        console.log(this.changePasswordForm.value);
        this._serviceMyProfile
            .updatePassword(this.changePasswordForm.value)
            .subscribe(
                (res: any) => {
                    this.loadingService.hide();
                    this.saving = false;
                    this.changePasswordForm.enable();
                    this._snackBar.openSnackBar(res.message, '');
                    // Reset the form
                    this.changePasswordNgForm.resetForm();
                    localStorage.clear();
                    this._router.navigateByUrl('/auth/login');
                },
                (err: any) => {
                    this.loadingService.hide();
                    this.saving = false;
                    // Re-enable the form
                    this.changePasswordForm.enable();
                    this._snackBar.openSnackBar(err.error.message, 'error');
                    this._router.navigate['-1'];
                }
            );
    }
}

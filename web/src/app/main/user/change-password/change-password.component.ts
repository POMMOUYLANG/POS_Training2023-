/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
// ==========================================================>> Core Library
import {
    Component,
    OnInit,
    ViewChild,
    Inject,
    EventEmitter,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    NgForm,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { environment as env } from 'environments/environment';
import { UserService } from '../user.service';
import { LoadingService } from 'helpers/services/loading';
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
    @ViewChild('updateNgForm') changePasswordNgForm: NgForm;
    UpdatePassword = new EventEmitter();
    public changePassword: FormGroup;
    public isLoading: boolean = false;
    public saving: boolean = false;
    public data: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public getRow: any,
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private snackBar: SnackbarService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.formBuilder();
    }

    formBuilder(): void {
        this.changePassword = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
            ]),
            confirm_password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
                this.passwordMatcher.bind(this),
            ]),
        });
    }

    private passwordMatcher(
        control: FormControl
    ): { [s: string]: boolean } | null {
        if (
            this.changePassword &&
            control.value !== this.changePassword.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }

    submit(): void {
        // Return if the form is invalid
        if (this.changePassword.invalid) {
            return;
        }

        // Disable the form
        this.changePassword.disable();

        // Send the request to the server
        this.loadingService.show();
        this.saving = true;

        let data = {
            ...this.changePassword.value,
        };
        this._userService.changePassword(this.getRow.id, data).subscribe(
            (res: any) => {
                this.dialogRef.close();
                this.saving = false;
                this.loadingService.hide();
                if (res.user) {
                    this.changePassword.enable();
                    this.UpdatePassword.emit(res.user);
                    console.log(res.user);
                    //use snack bar to opron message
                    this.snackBar.openSnackBar(res.message, '');
                    this.changePasswordNgForm.resetForm();
                }
            },
            (err: any) => {
                this.loadingService.hide();
                this.saving = false;
                // Re-enable the form
                this.changePassword.enable();
                this.snackBar.openSnackBar(err.error.message, 'error');
            }
        );
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
// ==========================================================>> Core Library
import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('createNgForm') createNgForm: NgForm;
  CreateProject = new EventEmitter();
  public saving: boolean = false;
  public create: UntypedFormGroup;
  public isLoading: boolean = false;
  public data: any;
  public mode: any;
  public src: string = 'assets/icons/icon-img.png';
  public products_type: any[][];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private dialogRef: MatDialogRef<CreateComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private snackBar: SnackbarService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.formBuilder();
  }

  srcChange($event: any): void {

    this.create.get('image').setValue($event);
  }

  formBuilder(): void {
    this.create = this._formBuilder.group({
      name: ['', Validators.required],
      type_id: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      image: [],
    });
  }

  //=============================================>> Status
  public check: any = {
    is_active: 0
  };
  onChange(is_active: any): any {
    this.check = {
      is_active: is_active === true ? 1 : 0
    };
    console.log(this.check);
  }

  submit(): void {
    // Return if the form is invalid
    if (this.create.invalid) {
      return;
    }

    // Disable the form
    this.create.disable();

    // Saving
    this.saving = true;

    const data = {
      ...this.create.value,
      ...this.check
    };
    // call to api
    this._userService.create(data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.CreateProject.emit(res.user);
        //use snack bar to opron message
        this.snackBar.openSnackBar(res.message, '');
      },
      (err: any) => {

        // Re-enable the form
        this.create.enable();

        // saved
        this.saving = false;

        let errors: any[] = [];
        errors = err.error.errors;
        const messages: any[] = [];
        let text: string = '';
        if (errors.length > 0) {
          errors.forEach((v: any) => {
            messages.push(v.message);
          });
          if (messages.length > 1) {
            text = messages.join('-');
          } else {
            text = messages[0];
          }
        } else {
          text = err.error.message;
        }
        this.snackBar.openSnackBar(text, 'error');
      }
    );
  }

}

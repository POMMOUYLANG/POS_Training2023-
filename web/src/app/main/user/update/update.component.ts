// ==========================================================>> Core Library
import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public FILE_PUBLIC_BASE_URL: string = env.FILE_PUBLIC_BASE_URL;
  @ViewChild('updateNgForm') updateNgForm: NgForm;
  UpdateProject = new EventEmitter();
  public saving: boolean = false;
  public update: UntypedFormGroup;
  public isLoading: boolean = false;
  public data: any;
  public mode: any;
  public src: string = 'assets/icons/icon-img.png';
  public users_type: any[][];

  constructor(
    @Inject(MAT_DIALOG_DATA) public getRow: any,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private snackBar: SnackbarService
  ) { 
    dialogRef.disableClose = true;
    this._userService.getUserType().subscribe((res: any) => {
      this.users_type = res;
    }, (err: any) => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    console.log(this.getRow);
    this.src = this.FILE_PUBLIC_BASE_URL + this.getRow?.avatar;
    this.formBuilder();
  }

  srcChange($event: any) {
    this.update.get('image').setValue($event);
  }

  formBuilder(): void {
    this.update = this._formBuilder.group({
      name:     [this.getRow?.name, Validators.required],
      type_id:  [this.getRow?.type_id, Validators.required],
      phone:    [this.getRow?.phone, Validators.required],
      email:    [this.getRow?.email, Validators.required],
      password: [this.getRow?.name, Validators.required],
      image:    [],
    });
  }

  //=============================================>> Status
  public check: any = {
    is_active: this.getRow?.is_active
  };
  onChange(is_active: any): any {
    this.check = {
      is_active: is_active == true ? 1 : 0
    };
  }

  submit(): void {
    // Return if the form is invalid
    if (this.update.invalid) {
      return;
    }

    // Disable the form
    this.update.disable();

    // Saving
    this.saving = true;

    let data = {
      ...this.update.value,
      ...this.check
    }

    // call to api
    this._userService.update(this.getRow.id,data).subscribe(
      (res: any) => {
        this.dialogRef.close();
        this.UpdateProject.emit(res.user);
        // use snack bar to opron message
        this.snackBar.openSnackBar(res.message, '');
      },
      (err: any) => {

        // Re-enable the form
        this.update.enable();

        // saved
        this.saving = false;

        let errors: any[] = [];
        errors = err.error.errors;
        let messages: any[] = [];
        let text: string = '';
        if (errors.length > 0) {
          errors.forEach((v: any) => {
            messages.push(v.message)
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

// ==========================================================>> Core Library
import { Component, Inject, OnInit, ViewChild, } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductTypeService } from '../product-type.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';

// ==========================================================>> Custom Library


@Component({
  selector: 'app-update',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent implements OnInit  {
  public form: UntypedFormGroup;
  public isSaving:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: UntypedFormBuilder,
    private snackBar: SnackbarService,
    private _dialogRef: MatDialogRef<ViewDialogComponent>,
    private _typeService: ProductTypeService,


  ) {

  }

  ngOnInit(): void {
    this.formBuilder();

  }

  formBuilder(): void {
    this.form = this._formBuilder.group({
      name: [this.data.name, Validators.required],
    });
  }
  save(){

    //Display spinner UI
    this.isSaving=true;

    this._typeService.update(this.data.id , this.form.value).subscribe(res =>{

      //Hide Spinner UI
      this.isSaving = false;

      //Display SnackBar Message
      this.snackBar.openSnackBar(res.message , '');

      //Close Dialog
      this._dialogRef.close(res.data);
    });

  }


}




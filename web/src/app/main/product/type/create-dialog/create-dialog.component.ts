// ==========================================================>> Core Library
import { Component, OnInit, } from '@angular/core';
import {  UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef } from '@angular/material/dialog';
import { ProductTypeService } from '../product-type.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';

// ==========================================================>> Custom Library


@Component({
  selector: 'app-update',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit  {
  public form: UntypedFormGroup;
  public isSaving:boolean = false; 
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: SnackbarService,
    private _dialogRef: MatDialogRef<CreateDialogComponent>,
    private _typeService: ProductTypeService,
    
    
  ) {
    
  }

  ngOnInit(): void {
    this.formBuilder();

  }

  formBuilder(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
    });
  }
  save(): void{

    //Display spinner UI
    this.isSaving=true;

    this._typeService.create( this.form.value).subscribe((res: any) =>{

      //Hide Spinner UI
      this.isSaving = false;

      //Display SnackBar Message
      this._snackBar.openSnackBar(res.message , '');

      //Close Dialog
      this._dialogRef.close(res.data);
    });

  }
  
}



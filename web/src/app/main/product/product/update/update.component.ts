// ==========================================================>> Core Library
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { ProductsService } from '../product.service';
import { environment as env } from 'environments/environment';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  public form: UntypedFormGroup;
  public isSaving: boolean = false;
  public srcImageFileUrl: string = 'assets/icons/icon-img.png';
  public types: any = []; //Product Type

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _dialogRef: MatDialogRef<UpdateDialogComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _service: ProductsService,
    private _snackBar: SnackbarService
  ) {

    // Make sure that user can't click anyarea to close the dialog
    _dialogRef.disableClose = true;

  }

  ngOnInit(): void {
    
    // Call API for getting product type tobe use in dropdown selection
    this.getProductType();

    // Build form 
    this.formBuilder();

    // Mapping File url of image
    this.srcImageFileUrl = env.FILE_PUBLIC_BASE_URL + this.dialogData.image;

  }


  formBuilder(): void {
    this.form = this._formBuilder.group({
      code: [this.dialogData.code, Validators.required],
      type_id: [this.dialogData.type_id, Validators.required],
      name: [this.dialogData.name, Validators.required],
      unit_price: [this.dialogData.unit_price, Validators.required],
      image: [''],
    });
  }

  // Getting base64 string after file is selected
  srcChange($event: any): void {

    // Assign base64 string ($event) to fill image of the form 
    this.form.get('image').setValue($event);
    
  }

  // Sent Data to API
  submit(): void {
    // Return if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Disable the form
    this.form.disable();

    // Saving
    this.isSaving = true;

    // call to api
    this._service.update(this.dialogData.id , this.form.value).subscribe(
      (res: any) => {

        // Display message in Snackbar
        this._snackBar.openSnackBar(res.message, '');

        // Close dialog and return data to listing component
        this._dialogRef.close(res.product);
      },
      (err: any) => {

        // Re-enable the form
        this.form.enable();

        // Stop saving 
        this.isSaving = false;

        // Display message in snackbar went wrong
        this._snackBar.openSnackBar('Something went wrong', 'error');
      }
    );
  }

  getProductType(): void {
    this._service.getProductType().subscribe(
      (res: any) => {
      this.types = res;
    },
  );
  }
}

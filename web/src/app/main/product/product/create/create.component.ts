// ==========================================================>> Core Library
import { Component, OnInit, Inject} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { ProductsService } from '../product.service';
import { ProductTypeService } from '../../type/product-type.service';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public saving: boolean = false;
  public form: UntypedFormGroup;
  public isLoading: boolean = false;
  public data: any;
  public srcImageFileUrl: string = 'assets/icons/icon-img.png';
  public types: any = [];//Product Type
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _dialogRef: MatDialogRef<CreateComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _productsService: ProductsService,
    private _productsTypeService: ProductTypeService,
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
      code: ['', Validators.required],
      type_id: ['', Validators.required],
      name: ['', Validators.required],
      unit_price: ['', Validators.required],
      image: [],
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
    this.saving = true;

    // call to api
    this._productsService.create(this.form.value).subscribe(
      (res: any) => {
        const product: any = this.form.value ;

        this._snackBar.openSnackBar(res.message, '');

        // Close dialog and return data to listing component
        this._dialogRef.close(res.data);
      },
      (err: any) => {

        // Re-enable the form
        this.form.enable();

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
        this._snackBar.openSnackBar(text, 'error');
      }
    );
  }

  getProductType(): void {
    this._productsTypeService.get().subscribe(
      (res: any) => {
      this.types = res;
    },
  );
  }
}

// ==========================================================>> Third Party Library
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { ProductTypeService } from '../product-type.service';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  public displayedColumns: string[] = ['no', 'name', 'n_of_products', 'date', 'action'];
  public dataSource: any;
  public isLoading: boolean = false;
  public data: any = [];

  constructor(
    private _typeService: ProductTypeService,
    private _snackBarService: SnackbarService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();

  }

  getData(){
    //Display loading UI
    this.isLoading = true;

    //Call API
    this._typeService.get().subscribe((res: any) => {
      //Hide Loading UI
      this.isLoading = false ;

      //Mapping Response to Data
      this.data       = res;
      // console.log(this.data.length);
      this.dataSource = new MatTableDataSource(res);

    }, (err: any) => {
      //Hide Loading UI
      this.isLoading = false ;

      //Display Error As SnackBar
      this._snackBarService.openSnackBar(err.error.message, 'error');
    });
  }
  
  view( i:number = 0, data:any = null ){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '500px';
    const dialogRef = this._dialog.open(ViewDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( (res: any) => {

     if(res){
      this.data[i] = res;
      this.dataSource = new MatTableDataSource(this.data)
     } 

    });
  }

  create(): void
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    const dialogRef = this._dialog.open(CreateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        res.n_of_products = 0;
      this.data.unshift(res) ;
      // this.data[i] = res;
      this.dataSource = new MatTableDataSource(this.data);
      } 

    });
  }

  delete(i: number=0, id: number = 0): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "320px";
    const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._typeService.delete(id).subscribe((res: any) => {
          this._snackBarService.openSnackBar(res.message, '');
          
          this.data.splice(i, 1);
          this.dataSource = new MatTableDataSource(this.data);
        }, (err: any) => {
          console.log(err);
          this._snackBarService.openSnackBar('Something went wrong.', 'error');
        });
      }
    });
  }

}

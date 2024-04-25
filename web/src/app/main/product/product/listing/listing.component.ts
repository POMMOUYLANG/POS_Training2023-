// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// ==========================================================>> Third Party Library
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// ==========================================================>> Custom Library
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { ProductTypeService } from '../../type/product-type.service';
import { LoadingService } from 'helpers/services/loading';
import { CreateComponent } from '../create/create.component';
import { ProductsService } from '../product.service';
import { environment as env } from 'environments/environment';
import { UpdateDialogComponent } from '../update/update.component';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
    public displayedColumns: string[] = [
        'no',
        'code',
        'image',
        'name',
        'type',
        'price',
        'date',
        'action',
    ];
    public dataSource: any;
    public FILE_PUBLIC_BASE_URL: string = env.FILE_PUBLIC_BASE_URL;
    public isLoading: boolean = true;
    public data: any = [];
    public total: number = 10;
    public limit: number = 10;
    public page: number = 1;
    public key: string = '';
    public products_type: any = [];
    public priducts_type_id: number = 0;
    constructor(
        private _productService: ProductsService,
        private _productsTypeService: ProductTypeService,
        private _snackBarService: SnackbarService,
        private _loadingService: LoadingService,
        private _dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.listing(this.limit, this.page);
        this.getProductType();
    }

    //===================================>> List
    listing(_limit: number = 10, _page: number = 1): any {
        const param: any = {
            limit: _limit,
            page: _page,
        };

        if (this.key != '') {
            param.key = this.key;
        }
        if (this.priducts_type_id != 0) {
            param.type = this.priducts_type_id;
        }
        if (this.page != 0) {
            param.page = this.page;
        }

        this.isLoading = true;
        this._loadingService.show();
        this._productService.read(param).subscribe(
            (res: any) => {
                this.isLoading = false;
                this._loadingService.hide();
                this.data = res.data;
                this.dataSource = new MatTableDataSource(this.data);
                this.total = res.total;
                this.page = res.current_page;
                this.limit = res.per_page;
            },
            (err: any) => {
                this.isLoading = false;
                this._loadingService.hide();
                this._snackBarService.openSnackBar(
                    'Something went wrong.',
                    'error'
                );
                console.log(err);
            }
        );
    }
    //=======================================>> On Page Changed
    onPageChanged(event: any): any {
        if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.listing(this.limit, this.page);
        }
    }

    //=======================================>> Create Product
    create(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '850px';
        const dialogRef = this._dialog.open(CreateComponent, dialogConfig);
        // dialogRef.componentInstance.CreateProject.subscribe((response: any) => {
        //     let copy: any[] = [];
        //     copy.push(response);
        //     this.data.forEach((row: any) => {
        //         copy.push(row);
        //     });
        //     this.data = copy;
        //     this.total += 1;
        //     this.limit += 1;
        //     this.dataSource = new MatTableDataSource(this.data);
        // });
        dialogRef.afterClosed().subscribe( (res: any) => {
           if(res){
            if(res){
                this.data.unshift(res);
                console.log(res);
                this.dataSource = new MatTableDataSource(this.data);
            }
             
           }
        });


    }
    //=======================================>> Delete Product
    delete(id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '320px';
        const dialogRef = this._dialog.open(
            ConfirmDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._productService.delete(id).subscribe(
                    (res: any) => {
                        this._snackBarService.openSnackBar(res.message, '');
                        let copy: any[] = [];
                        this.data.forEach((obj: any) => {
                            if (obj.id !== id) {
                                copy.push(obj);
                            }
                        });
                        this.total -= 1;
                        this.limit -= 1;
                        this.data = copy;
                        this.dataSource = new MatTableDataSource(this.data);
                    },
                    (err: any) => {
                        console.log(err);
                        this._snackBarService.openSnackBar(
                            'Something went wrong.',
                            'error'
                        );
                    }
                );
            }
        });
    }
    //=======================================>> View Product
    view(id: number): void {
        // Navigate to the view with the ID
        this.router.navigate([id, 'view'], { relativeTo: this.route.parent });
    }

    update( i: number = 0, data: any = null ): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data;
      dialogConfig.width = '500px';
      const dialogRef = this._dialog.open(UpdateDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( (res: any) => {
        if(res){
            this.data[i] = res;
            this.dataSource = new MatTableDataSource(this.data);
        }

      });
    }

    getProductType(): void {
      this._productsTypeService.get().subscribe(
        (res: any) => {
        this.products_type = res;
      },
    );
    }
}

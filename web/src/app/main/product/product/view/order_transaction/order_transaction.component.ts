  // app-transaction.component.ts
  import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
  import { ProductsService } from '../../product.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { SnackbarService } from 'app/shared/services/snackbar.service';
  import { GlobalConstants } from 'app/shared/global-constants';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table';
  import { PageEvent } from '@angular/material/paginator';
  
  
  
  
    @Component({
      selector: 'app-transaction',
      templateUrl: './order_transaction.component.html',
      styleUrls: ['./order_transaction.component.scss'],
    })
    export class OrderTransactionComponent implements OnInit {
    @Input() public productId: number;
    public displayedColumns: string[] = ['no','invoice','qty','cashier','date'];
    public datas: any = [];
    public dataSource: any;
  
    public isLoading: boolean = true;
    public total: number = 10;
    public limit: number = 10;
    public page: number = 1;
    public receiptNumber: string = '';
    public from:  any;
    public to:    any;
  
      constructor(
          private productService: ProductsService,
          private _snackBar: SnackbarService,
  
          ) {}
  
      ngOnInit(): void {
          this.listing(this.limit, this.page);
      }
  
      listing(_limit: number = 10, _page: number = 1): void {
          const param: any = {
              limit: _limit,
              page: _page,
              };
              // Fillter by Receipt Number
              if (this.receiptNumber !== '') {
                  param.receipt_number = this.receiptNumber;
              }
               // Parameter Date Range
              if (this.from !== undefined && this.to !== undefined) {
  
                  param.from    = this.from;
                  param.to      = this.to;
  
                }
  
              if (this.page != 0) {
                  param.page = this.page;
              }
  
          this.isLoading = true;
          this.productService.getTransactions(this.productId,param).subscribe({
            next: (res: any) => {
              this.isLoading = false;
              this.datas = res.order_details?.data;
              this.dataSource = new MatTableDataSource(this.datas);
              this.total = res?.order_details?.total;
              this.page = res?.order_details?.current_page;
              this.limit = res?.order_details?.per_page;
                  },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              this._snackBar.openSnackBar(err.error ? err.error.message : 'Something went wrong.', GlobalConstants.error);
            }
          });
        }
  
        onPageChanged(event: any): any {
          if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.listing(this.limit, this.page);
          }
        }
      }
  
  
// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

// ==========================================================>> Custom Library
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SaleService } from '../sale.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { DetailsComponent } from '../details/details.component';
import * as FileSaver from 'file-saver';

const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD-MMM-YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'DD-MMM-YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMM YYYY',
    },
};
@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    ],
})
export class ListingComponent implements OnInit {
    public displayedColumns: string[] = [
        'no',
        'invoice',
        'cashier',
        'price',
        'date',
        'action',
    ];
    public dataSource: any;
    public isLoading: boolean = true;

    public data: any = [];

    public page: number = 1;
    public receiptNumber: string = '';

    // Pagination Data
    public from: any;
    public to: any;
    public total: number = 10;
    public limit: number = 10;

    public downloading: boolean = false;

    constructor(
        private _saleService: SaleService,
        private _snackBarService: SnackbarService,
        private _dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.listing(this.limit, this.page);
    }

    //===================================>> List
    listing(_limit: number = 10, _page: number = 1): any {
        // Parameter Preparation
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
            param.from = this.from;
            param.to = this.to;
        }

        if (this.page !== 0) {
            param.page = this.page;
        }

        this.isLoading = true;

        this._saleService.getData(param).subscribe(
            (res: any) => {
                // Stop Loading
                this.isLoading = false;

                // Mapping Data
                this.data = res.data;

                // Mapping Data Source
                this.dataSource = new MatTableDataSource(this.data);

                // Update Pagination
                this.total = res.total;
                this.page = res.current_page;
                this.limit = res.per_page;
            },
            (err: any) => {
                // Stop Loading
                this.isLoading = false;

                // Display Warning Mesage
                this._snackBarService.openSnackBar(
                    'Something went wrong.',
                    'error'
                );
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

    //=======================================>> View Sale
    view(row: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = row;
        dialogConfig.width = '650px';
        const dialogRef = this._dialog.open(DetailsComponent, dialogConfig);
    }

    //=======================================>> Delete Sale
    delete(id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '320px';
        const dialogRef = this._dialog.open(
            ConfirmDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._saleService.delete(id).subscribe(
                    (res: any) => {
                        this._snackBarService.openSnackBar(res.message, '');
                        const copy: any[] = [];
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

    // ========== download receipt payment ============= \\
    print(row: any): void {
        this.downloading = true;
        console.log(row);
        this._saleService.print(row).subscribe(
            (res: any) => {
                this.downloading = false;
                const blob = this._saleService.b64toBlob(
                    res.file_base64,
                    'application/pdf',
                    ''
                );
                FileSaver.saveAs(blob, 'Invoice-' + row + '.pdf');
            },
            (err: any) => {
                this.downloading = false;
                console.log(err);
            }
        );
    }
}

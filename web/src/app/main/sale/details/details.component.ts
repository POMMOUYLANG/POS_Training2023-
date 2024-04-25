// ==========================================================>> Core Library
import { Component, Inject, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// ==========================================================>> Custom Library
import { SaleService } from '../sale.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    public displayedColumns: string[] = [
        'no',
        'product',
        'price',
        'qty',
        'total',
    ];
    public dataSource: any;
    public data: any[] = [];
    public downloading: boolean = false;

    public item: any[];
    constructor(
        @Inject(MAT_DIALOG_DATA) public getRow: any,
        private _dialogRef: MatDialogRef<DetailsComponent>,
        private _saleService: SaleService
    ) {
        this._dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.data = this.getRow?.details;
        this.dataSource = new MatTableDataSource(this.data);
    }

    print(): void {
        this.downloading = true;
        this._saleService.print(this.getRow.receipt_number).subscribe(
            (res: any) => {
                this.downloading = false;
                const blob = this._saleService.b64toBlob(
                    res.file_base64,
                    'application/pdf',
                    ''
                );
                FileSaver.saveAs(
                    blob,
                    'Invoice-' + this.getRow.receipt_number + '.pdf'
                );
            },
            (err: any) => {
                this.downloading = false;
                console.log(err);
            }
        );
    }
}

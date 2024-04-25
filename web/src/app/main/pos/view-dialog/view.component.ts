// ==========================================================>> Core Library
import { Component, Inject, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { SaleService } from 'app/main/sale/sale.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
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
    constructor(
        @Inject(MAT_DIALOG_DATA) public getRow: any,
        private dialogRef: MatDialogRef<ViewComponent>,
        private _printOrder: SaleService
    ) {
        this.dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.data = this.getRow?.details;
        this.dataSource = new MatTableDataSource(this.data);
        console.log(this.data);
    }
    // Download order invoice
    print() {
        this.downloading = true;
        this._printOrder.print(this.getRow.receipt_number).subscribe(
            (res: any) => {
                this.downloading = false;
                let blob = this.b64toBlob(
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

    // =================================>> Convert base64 to blob
    b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ==========================================================>> Core Library
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SaleService {
    public url: string = env.API_BASE_URL;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    /**
     |-------------------------------------------------------------------
     | Learn Read Delete (RD)
     |-------------------------------------------------------------------
     |
     | develop by: Yim Klok
     |
     */
    // ==================== Read All Products
    getData(params = {}): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        httpOptions['params'] = params;
        return this.http.get(this.url + '/admin/sales', httpOptions);
    }
    // ==================== Print Product
    print(receipt_number: number = 0): any {
        return this.http.get(
            this.url + '/admin/sales/print/' + receipt_number,
            this.httpOptions
        );
    }
    // ==================== Delete One Product
    delete(id: number = 0): any {
        return this.http.delete(
            this.url + '/admin/sales/' + id,
            this.httpOptions
        );
    }

    //==================================================================

    //// =================================>> Convert base64 to blob
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

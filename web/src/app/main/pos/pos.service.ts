// ==========================================================>> Core Library
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PosService {

    public url: string = env.API_BASE_URL;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }




    // ==================================================================>>  Read All Products Group by Type
    getProducts(params = {}): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get(this.url + '/admin/pos/products', httpOptions);
    }

    // ==================================================================>> Make Order
    makeOrder(data: object = {}): any {
        return this.http.post(this.url + '/admin/pos/order', data, this.httpOptions);
    }

}

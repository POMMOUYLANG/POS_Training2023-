// ==========================================================>> Core Library
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductTypeService {
    read() {
      throw new Error('Method not implemented.');
    }

    public url: string = env.API_BASE_URL;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    // ==================== Read All types
    get(): any {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        return this.http.get(this.url + '/admin/products/types', httpOptions);
    }

    // ==================== Update One Brand
    update(id: number = 0, data: object = {}): any {
        return this.http.post(this.url + '/admin/products/types/' + id, data, this.httpOptions);
    }

    // ==================== Create One Brand
    create( data: object = {}): any {
        return this.http.post(this.url + '/admin/products/types', data , this.httpOptions);
    }

    // ==================== Delete One Brand
    delete(id: number = 0): any {
        return this.http.delete(this.url + '/admin/products/types/' + id, this.httpOptions);
    }
}

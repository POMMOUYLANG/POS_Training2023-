/* eslint-disable @typescript-eslint/member-delimiter-style */
// ==========================================================>> Core Library
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { ListUsers } from './user.types';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public url: string = env.API_BASE_URL;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ===================>> Get One User
    getUserType(): any {
        return this.http.get(
            this.url + '/admin/user/get-type',
            this.httpOptions
        );
    }

    // ===================>> Get All Users
    listing(params: {
        limit: number;
        page: number;
        key?: string | number | null;
    }): Observable<ListUsers> {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        httpOptions['params'] = params;
        return this.http.get<ListUsers>(this.url + '/admin/users', httpOptions);
    }

    // ===================>> Get One User
    view(id: any = ''): any {
        const httpOptions = {};
        return this.http.get(this.url + '/admin/users/' + id, httpOptions);
    }

    // ===================>> Create User
    create(data: any = {}): any {
        return this.http.post(
            this.url + '/admin/users',
            data,
            this.httpOptions
        );
    }

    // ===================>> Update User
    update(id: number = 0, data: object = {}): any {
        return this.http.post(
            this.url + '/admin/users/' + id,
            data,
            this.httpOptions
        );
    }

    // ===================>> Update password
    changePassword(id: number = 0, data: object = {}): any {
        return this.http.post(
            this.url + '/admin/users/' + id + '/change-password',
            data,
            this.httpOptions
        );
    }

    // ===================>> Update User
    delete(id: number = 0): any {
        return this.http.delete(
            this.url + '/admin/users/' + id,
            this.httpOptions
        );
    }

    // ===================>> Update password
    blockUser(id: number = 0): any {
        return this.http.post(
            this.url + '/admin/users/block/' + id,
            this.httpOptions
        );
    }
}

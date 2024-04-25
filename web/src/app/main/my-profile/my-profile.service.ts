// ==========================================================>> Core Library
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// ==========================================================>> Third Party Library
import { tap, catchError } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
// ==========================================================>> Custom Library
import { environment as env } from 'environments/environment';

export interface User {
    id: number,
    name: string,
    email?: string,
    phone: string,
    avatar: string,
  };

  export interface ResponseLogin {
    access_token: string,
    token_type: string,
    expires_in: string,
    user: User,
    role: string
}
@Injectable({
    providedIn: 'root',
})

export class MyProfileService {

    public url: string = env.API_BASE_URL;
    public httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) {}

    // ==================== Get Profile
    getProfile(): any {
        return this.http.get(this.url + '/my-profiles', this.httpOptions);
    }

    // ==================== Update Profile
    updateProfile(data: any): any {
        return this.http.post(this.url + '/my-profiles',data, this.httpOptions);
    }

    // =================== Update password
    updatePassword(data: any): any {
        return this.http.post(this.url + '/my-profiles/change-password',data, this.httpOptions);
    }

    // ==================== user service for replay ====================== \\
    private _user: ReplaySubject<any> = new ReplaySubject<any>();
    set user(value: any) {
        this._user.next(value);
    }
    get user$(): Observable<any> {
        return this._user.asObservable();
    }
    //==========================================
    private _refresh: ReplaySubject<ResponseLogin> = new ReplaySubject<ResponseLogin>();
    set token(value: ResponseLogin) {
        this._refresh.next(value);
    }
    get token$(): Observable<ResponseLogin> {
        return this._refresh.asObservable();
    }
}

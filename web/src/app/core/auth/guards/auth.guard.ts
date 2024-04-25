import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    public token: any;
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     */
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.token = this._authService.getToken();
        if(this.token){
            //access
            return of(true);
        }
        //not access
        this._router.navigateByUrl('/auth/login');
        return of(false);
    }
}

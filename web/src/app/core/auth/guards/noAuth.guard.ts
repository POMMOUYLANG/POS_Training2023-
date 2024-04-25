import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate
{
    private token: any;
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
            //not access and go to dashboard
            this._router.navigateByUrl('/dashboard');
            return of(false);
        }
        //access
        return of(true);
    }
}

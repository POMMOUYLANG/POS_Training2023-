import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { environment as env } from 'environments/environment';
@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls  : ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit {
    user: any;
    public file:string = env.FILE_PUBLIC_BASE_URL;
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _authService: AuthService
        ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = localStorage.getItem('user');
        if (this.user) {
            this.user = JSON.parse(this.user);
            if (!this.user) {
                localStorage.clear();
                this._router.navigateByUrl('/auth/login');
            }
        }
        console.log(this.user)
    }




    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Profile
     */
    myProfile(): void {
        this._router.navigate(['my-profile']);
    };

    /**
     * Logout
     */
    logout(): void {
        this._authService.logout();
    }
}

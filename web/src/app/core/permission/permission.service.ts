import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PermissionService
{
    private _permission: ReplaySubject<any> = new ReplaySubject<any>(1);

    /**
     * Constructor
     */
    constructor(){}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for permission
     *
     * @param value
     */
    set permission(value: any)
    {
        console.log(value);
        // Store the value
        this._permission.next(value);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get permission$(): Observable<any>
    {
        return this._permission.asObservable();
    }
}

// ==============================================>> Core Library
import { Component, OnInit } from '@angular/core';

// ==============================================>> Custom Library
// Shared
import { SnackbarService } from 'app/shared/services/snackbar.service';

// Dashboard Service
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    // ===>> Public Variables used in the component and template.
    public totalSaleToday: number = 0; // For Displaying Total Price.
    public isLoading: boolean = false; // for loading Spinner UI Status

    constructor(
        //===> Private Variables used in this component only
        private _dashboardService: DashboardService, // for API calling
        private _snackBar: SnackbarService // for Displaying Message
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        //===> Call API for Dashobard Data.
        this.getDashboardInfo();
    }

    //=======================================================>> Function getDashobardInfo in this component
    getDashboardInfo(): any {
        //===> Call API for Dashobard Data in Service.
        this._dashboardService.getDashboardInfo().subscribe(
            (res: any) =>
                // ===================================================================>> Success: HTTP 200
                {
                    //===> Hide Loading Spinner UI
                    this.isLoading = false;

                    //===> Update Total Price by Today.
                    this.totalSaleToday = res.total_sale_today;

                    // ===================================================================>> Not Success
                },
            (err: any) => {
                //===> Hide Loading Spinner UI
                this.isLoading = false;

                //===> Display Error Message
                this._snackBar.openSnackBar('Something went wrong.', 'error');
            }
        );
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// ==========================================================>> Custom Library
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { UserService } from '../user.service';
import { environment as env } from 'environments/environment';
import { ListUsers, User } from '../user.types';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
    public isSearching: boolean = true;
    public FILE_PUBLIC_BASE_URL: string = env.FILE_PUBLIC_BASE_URL;

    public displayedColumns: string[] = [
        'no',
        'name',
        'phone',
        'status',
        'last_update',
        'action',
    ];
    public dataSource: MatTableDataSource<User>;
    public data: User[];

    // Pagination
    public total: number = 10;
    public limit: number = 10;
    public page: number = 1;

    // Filter
    public key: string = '';

    public entities: any[] = [];
    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        private _snackBar: SnackbarService,
        private _dialog: MatDialog
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.listing(this.limit, this.page);
    }

    //====================================================>> Listing
    listing(_limit: number = 10, _page: number = 1): any {
        const param: {
            limit: number;
            page: number;
            key?: string | number | null;
        } = {
            limit: _limit,
            page: _page,
        };

        if (this.key !== '') {
            param.key = this.key;
        }

        if (this.page !== 0) {
            param.page = this.page;
        }

        // Display Spinner UI
        this.isSearching = true;

        // ===>> Call API
        this._userService.listing(param).subscribe({
            next: (res: ListUsers) => {
                // Hide Spinner
                this.isSearching = false;

                // Data Mapping
                this.data = res.data;

                // Data Source Mapping
                this.dataSource = new MatTableDataSource(this.data);

                // Pagination value update
                this.total = res.total;
                this.page = res.current_page;
                this.limit = res.per_page;
            },
            error: (err: HttpErrorResponse) => {
                // Hide Spinner
                this.isSearching = false;

                // Display Snackbar
                this._snackBar.openSnackBar('Something went wrong.', 'error');
            },
        });
    }

    //====================================================>> Create
    create(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '650px';
        const dialogRef = this._dialog.open(CreateComponent, dialogConfig);
        dialogRef.componentInstance.CreateProject.subscribe((response: any) => {
            const copy: any[] = [];
            copy.push(response);
            this.data.forEach((row: any) => {
                copy.push(row);
            });
            this.data = copy;
            this.total += 1;
            this.limit += 1;
            this.dataSource = new MatTableDataSource(this.data);
        });
    }

    //====================================================>> Create
    update(row: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = row;
        dialogConfig.width = '650px';
        const dialogRef = this._dialog.open(UpdateComponent, dialogConfig);
        dialogRef.componentInstance.UpdateProject.subscribe((response: any) => {
            const copy: any[] = [];
            this.data.forEach((v: any) => {
                if (v.id === response.id) {
                    copy.push(response);
                } else {
                    copy.push(v);
                }
            });
            this.data = copy;
            this.dataSource = new MatTableDataSource(this.data);
        });
    }

    //====================================================>> Change Password
    changePassword(row: any): void {
        console.log(row);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = row;
        dialogConfig.width = '650px';
        const dialogRef = this._dialog.open(
            ChangePasswordComponent,
            dialogConfig
        );
    }

    //====================================================>> Delete
    delete(project_id: number = 0): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '320px';
        const dialogRef = this._dialog.open(
            ConfirmDialogComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
                this._userService.delete(project_id).subscribe(
                    (res: any) => {
                        this.isSearching = false;
                        this._snackBar.openSnackBar(res.message, '');
                        const copy: any[] = [];
                        this.data.forEach((obj: any) => {
                            if (obj.id !== project_id) {
                                copy.push(obj);
                            }
                        });
                        this.data = copy;
                        this.total -= 1;
                        this.dataSource = new MatTableDataSource(this.data);
                    },
                    (err: any) => {
                        this.isSearching = false;
                        this._snackBar.openSnackBar(
                            'Something went wrong.',
                            'error'
                        );
                    }
                );
            }
        });
    }

    //=============================================>> Status
    onChange(status: any, id: any): any {
        const data = {
            status: status === true ? 1 : 0,
            id: id,
        };
        //console.log(data);
        this._userService.blockUser(id).subscribe(
            (res: any) => {
                this._snackBar.openSnackBar(res.message, '');
            },
            (err: any) => {
                this._snackBar.openSnackBar('Something went wrong.', 'error');
            }
        );
    }

    //========================================================>> On Page Changed
    onPageChanged(event: any): any {
        if (event && event.pageSize) {
            this.limit = event.pageSize;
            this.page = event.pageIndex + 1;
            this.listing(this.limit, this.page);
        }
    }
}

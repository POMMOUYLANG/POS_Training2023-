/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
// ==========================================================>> Core Library
import { Component, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
const moment = _moment;

// ==========================================================>> Custom Library
import { SnackbarService } from 'app/shared/services/snackbar.service';
import { environment as env } from 'environments/environment';
import { PosService } from '../pos.service';
import { ViewComponent } from '../view-dialog/view.component';

const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD-MMM-YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'DD-MMM-YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMM YYYY',
    },
};

@Component({
    selector: 'app-listing',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    ],
})
export class POSComponent implements OnInit {
    public data: any[] = [];
    public canSubmit: boolean = true;
    public isLoading: boolean = false;
    public FILE_PUBLIC_BASE_URL = env.FILE_PUBLIC_BASE_URL;

    public time: string = '';
    public cashier: string = '';

    public cart: any[] = []; // An Empty Cart.
    public isOrderBeingMade: boolean = false;
    public totalPrice: number = 0;
    public status_id: number = 0;

    constructor(
        private _posService: PosService,
        private _snackBarService: SnackbarService,
        private _dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user'));
        this.cashier = user.name;
        this.isLoading = true;

        // ==== Get Product
        this._posService.getProducts().subscribe((res: any) => {
            this.isLoading = false;
            this.data = res;
        });
    }

    addToCart(incomingItem: any, qty = 0): void {
        let isExisting: boolean = false;

        const item: any = {
            id: incomingItem.id,
            name: incomingItem.name,
            qty: qty,
            temp_qty: qty,
            unit_price: incomingItem.unit_price,
        };

        //If cart is not empty, find added item and update its new QTY.
        if (this.cart.length > 0) {
            let j = 0;
            //Loop inside the cart to find existing item;
            this.cart.forEach((cartItem) => {
                //Found the existing item (compared by incoming id)
                if (cartItem['id'] == incomingItem.id) {
                    isExisting = true;
                    this.cart[j]['qty'] = parseInt(cartItem['qty']) + qty; //Update QTY: the existing qty + incoming qty
                    this.cart[j]['temp_qty'] = parseInt(cartItem['qty']);
                }
                j++;
            });
        }

        // If the incoming item is not found, add this new item to Cart
        if (!isExisting) {
            this.cart.push(item);
        }

        // ===>> Refresh Total Price to display in UI
        this.getTotalPrice();
    }

    // ===============================>> Get total price
    getTotalPrice(): void {
        let total = 0;
        this.cart.forEach((item) => {
            total += parseInt(item.qty) * parseInt(item.unit_price);
        });

        this.totalPrice = total;
    }

    // ================================>> Sub value
    blur(event: any, index: number = -1): void {
        const tempQty = this.cart[index]['qty'];
        if (event.target.value == 0) {
            this.canSubmit = false;
        } else {
            this.canSubmit = true;
        }

        if (event.target.value > 1000) {
            event.target.value = 1000;
        }

        if (!event.target.value) {
            this.cart[index]['qty'] = tempQty;
            this.cart[index]['temp_qty'] = tempQty;
        } else {
            this.cart[index]['qty'] = parseInt(event.target.value);
            this.cart[index]['temp_qty'] = parseInt(event.target.value);
        }

        this.getTotalPrice();
    }

    // =================================>> Remove item from Cart
    remove(value: any, index: number = -1): void {
        if (value == 0) {
            this.canSubmit = true;
        }

        this.cart.splice(index, 1);
        this.getTotalPrice();
    }

    // ================================>> CheckOut
    checkOut(): void {
        const cart: any = {};
        this.cart.forEach((item) => {
            cart[item.id] = item.qty;
        });

        // Convert variable cart to be a json string
        const data = {
            cart: JSON.stringify(cart),
            status_id: this.status_id,
        };

        this.isOrderBeingMade = true; // Update spinner in UI
        this.time = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

        this._posService.makeOrder(data).subscribe(

            //========================>> Success
            (res: any) => {
                this.isOrderBeingMade = false;

                this.cart = [];
                this._snackBarService.openSnackBar(res.message, '');

                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = res.order;
                dialogConfig.width = '650px';

                this._dialog.open(ViewComponent, dialogConfig);
            },

            //========================>> Not Success
            (err: any) => {
                this.isOrderBeingMade = false;
                this._snackBarService.openSnackBar(err.error.message, 'error');
            }
        );
    }
}

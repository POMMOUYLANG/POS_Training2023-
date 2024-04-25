import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { HelpersNavigationService, NavigationComponent } from 'helpers/components/navigation';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpersNavigationService: HelpersNavigationService,
        private _translocoService: TranslocoService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'en',
            'kh': 'kh'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._helpersNavigationService.getComponent<NavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the dashboard item and update its title
        const dashboardItem = this._helpersNavigationService.getItem('dashboard', navigation);
        if (dashboardItem) {
            this._translocoService.selectTranslate('Dashboard').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    dashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const posItam = this._helpersNavigationService.getItem('pos', navigation);
        if (posItam) {
            this._translocoService.selectTranslate('Pos').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    posItam.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const saleItem = this._helpersNavigationService.getItem('sale', navigation);
        if (saleItem) {
            this._translocoService.selectTranslate('Sale').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    saleItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const productItem = this._helpersNavigationService.getItem('product', navigation);
        if (productItem) {
            this._translocoService.selectTranslate('Product').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    productItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const allProductItem = this._helpersNavigationService.getItem('all-product', navigation);
        if (allProductItem) {
            this._translocoService.selectTranslate('All Products').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    allProductItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const productTypeItem = this._helpersNavigationService.getItem('product-type', navigation);
        if (productTypeItem) {
            this._translocoService.selectTranslate('Product Type').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    productTypeItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const userItem = this._helpersNavigationService.getItem('user', navigation);
        if (userItem) {
            this._translocoService.selectTranslate('Users').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    userItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the profile item and update its title
        const myProfileItem = this._helpersNavigationService.getItem('profile', navigation);
        if (myProfileItem) {
            this._translocoService.selectTranslate('Profile').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    myProfileItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}

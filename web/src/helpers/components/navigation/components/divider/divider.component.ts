// ==========================================================>> Core Library
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { Subject, takeUntil } from 'rxjs';

// ==========================================================>> Custom Library
import { NavigationComponent } from 'helpers/components/navigation/navigation.component';
import { HelpersNavigationService } from 'helpers/components/navigation/navigation.service';
import { NavigationItem } from 'helpers/components/navigation/navigation.types';

@Component({
    selector       : 'navigation-divider-item',
    templateUrl    : './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationDividerItemComponent implements OnInit, OnDestroy
{
    @Input() item: NavigationItem;
    @Input() name: string;

    private _navigationComponent: NavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpersavigationService: HelpersNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._navigationComponent = this._helpersavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._navigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}

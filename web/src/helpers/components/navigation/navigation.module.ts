// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ==========================================================>> Custom Library
import { ScrollbarModule } from 'helpers/directives/scrollbar/public-api';
import { NavigationAsideItemComponent } from 'helpers/components/navigation/components/aside/aside.component';
import { NavigationBasicItemComponent } from 'helpers/components/navigation/components/basic/basic.component';
import { NavigationCollapsableItemComponent } from 'helpers/components/navigation/components/collapsable/collapsable.component';
import { NavigationDividerItemComponent } from 'helpers/components/navigation/components/divider/divider.component';
import { NavigationGroupItemComponent } from 'helpers/components/navigation/components/group/group.component';
import { NavigationSpacerItemComponent } from 'helpers/components/navigation/components/spacer/spacer.component';
import { NavigationComponent } from 'helpers/components/navigation/navigation.component';
import { MaterialModule } from 'app/shared/material-module';

@NgModule({
    declarations: [
        NavigationAsideItemComponent,
        NavigationBasicItemComponent,
        NavigationCollapsableItemComponent,
        NavigationDividerItemComponent,
        NavigationGroupItemComponent,
        NavigationSpacerItemComponent,
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ScrollbarModule,
    ],
    exports: [NavigationComponent],
})
export class NavigationModule {}

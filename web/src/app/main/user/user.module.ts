// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ==========================================================>> Third Party Library
import { UiSwitchModule } from 'ngx-ui-switch';

// ==========================================================>> Custom Library
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { ListingComponent } from './listing/listing.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const userRoutes: Routes = [
    {
        path: '',
        component: ListingComponent,
    },
];

@NgModule({
    imports: [
        SharedModule,
        ScrollbarModule,
        UiSwitchModule,
        RouterModule.forChild(userRoutes),
    ],
    declarations: [
        ListingComponent,
        CreateComponent,
        UpdateComponent,
        ChangePasswordComponent,
    ],
})
export class UserModule {}

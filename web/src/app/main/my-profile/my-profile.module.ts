// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ==========================================================>> Custom Library
import { SharedModule } from 'app/shared/shared.module';
import { ScrollbarModule } from 'helpers/directives/scrollbar';
import { MyProfileComponent } from './my-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const myProfileRoutes: Routes = [
    {
        path: '',
        component: MyProfileComponent,
    },
];

@NgModule({
    imports: [
        SharedModule,
        ScrollbarModule,
        RouterModule.forChild(myProfileRoutes),
    ],
    declarations: [
        MyProfileComponent,
        OverviewComponent,
        ChangePasswordComponent
    ],
})
export class MyProfileModule {}

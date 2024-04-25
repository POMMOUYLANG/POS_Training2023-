// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ==========================================================>> Custom Library
// Shared
import { SharedModule } from 'app/shared/shared.module';
import { AlertModule } from 'helpers/components/alert';

// Inside Module
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(authRoutes),
        SharedModule,
        AlertModule
    ]
})
export class AuthModule{}

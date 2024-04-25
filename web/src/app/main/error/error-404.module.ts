// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// ==========================================================>> Custom Library
import { Error404Component } from 'app/main/error/error-404.component';
import { error404Routes } from 'app/main/error/error-404.routing';

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule.forChild(error404Routes)
    ]
})
export class Error404Module
{
}

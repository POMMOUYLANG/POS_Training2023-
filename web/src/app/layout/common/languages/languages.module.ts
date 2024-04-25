import { NgModule } from '@angular/core';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { MaterialModule } from 'app/shared/material-module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        LanguagesComponent
    ],
    imports     : [
        MaterialModule,
        SharedModule
    ],
    exports     : [
        LanguagesComponent
    ]
})
export class LanguagesModule
{
}

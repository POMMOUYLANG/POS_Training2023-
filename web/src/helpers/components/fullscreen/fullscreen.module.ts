// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ==========================================================>> Custom Library
import { FullscreenComponent } from 'helpers/components/fullscreen/fullscreen.component';
import { MaterialModule } from 'app/shared/material-module';

@NgModule({
    declarations: [
        FullscreenComponent
    ],
    imports     : [
        MaterialModule,
        CommonModule
    ],
    exports     : [
        FullscreenComponent
    ]
})
export class FullscreenModule
{
}

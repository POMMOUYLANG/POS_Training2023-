// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ==========================================================>> Third Party Library
import { MaterialModule } from './material-module';
import { ImageCropperModule } from 'ngx-image-cropper';

// ==========================================================>> Custom Library
import { PortraitComponent, PortraitDialogComponent } from './portrait/portrait.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        PortraitComponent,
        PortraitDialogComponent,
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ImageCropperModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PortraitComponent,
        PortraitDialogComponent,
    ],
})
export class SharedModule
{

    
}

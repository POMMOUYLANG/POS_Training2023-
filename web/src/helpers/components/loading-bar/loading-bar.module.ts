// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ==========================================================>> Third Party Library
import { MatProgressBarModule } from '@angular/material/progress-bar';

// ==========================================================>> Custom Library
import { LoadingBarComponent } from 'helpers/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [LoadingBarComponent],
    imports: [CommonModule, MatProgressBarModule],
    exports: [LoadingBarComponent],
})
export class LoadingBarModule {}

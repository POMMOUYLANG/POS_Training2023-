// ==========================================================>> Core Library
import { NgModule } from '@angular/core';

// ==========================================================>> Custom Library
import { ScrollbarDirective } from 'helpers/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        ScrollbarDirective
    ],
    exports     : [
        ScrollbarDirective
    ]
})
export class ScrollbarModule
{
}

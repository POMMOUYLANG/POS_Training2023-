// ==========================================================>> Core Library
import { NgModule } from '@angular/core';

// ==========================================================>> Custom Library
import { UtilsService } from 'helpers/services/utils/utils.service';

@NgModule({
    providers: [UtilsService],
})
export class UtilsModule {
    /**
     * Constructor
     */
    constructor(private _utilsService: UtilsService) {}
}

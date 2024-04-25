// ==========================================================>> Core Library
import { NgModule, Optional, SkipSelf } from '@angular/core';

// ==========================================================>> Third Party Library
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

// ==========================================================>> Custom Library
import { ConfirmationModule } from 'helpers/services/confirmation';
import { LoadingModule } from 'helpers/services/loading';
import { MediaWatcherModule } from 'helpers/services/media-watcher/media-watcher.module';
import { SplashScreenModule } from 'helpers/services/splash-screen/splash-screen.module';
import { UtilsModule } from 'helpers/services/utils/utils.module';

@NgModule({
    imports: [
        ConfirmationModule,
        LoadingModule,
        MediaWatcherModule,
        SplashScreenModule,
        UtilsModule,
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
    ],
})
export class HelpersModule {
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: HelpersModule) {
        if (parentModule) {
            throw new Error(
                'HelpersModule has already been loaded. Import this module in the AppModule only!'
            );
        }
    }
}

// ==========================================================>> Core Library
import { NgModule } from '@angular/core';

// ==========================================================>> Custom Library
import { SplashScreenService } from 'helpers/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [SplashScreenService],
})
export class SplashScreenModule {
    /**
     * Constructor
     */
    constructor(private _splashScreenService: SplashScreenService) {}
}

// ==========================================================>> Core Library
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// ==========================================================>> Custom Library
import { NAVIGATION_API_DEFAULT_DELAY } from 'helpers/navigation-api/navigation-api.constants';
import { NavigationApiInterceptor } from 'helpers/navigation-api/navigation-api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: NavigationApiInterceptor,
            multi   : true
        }
    ]
})
export class NavigationApiModule
{
    /**
     * MockApi module default configuration.
     *
     * @param navigationApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(navigationApiServices: any[], config?: { delay?: number }): ModuleWithProviders<NavigationApiModule>
    {
        return {
            ngModule : NavigationApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...navigationApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : NAVIGATION_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}

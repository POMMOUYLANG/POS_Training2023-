// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

// ==========================================================>> Third Party Library
import { MarkdownModule } from 'ngx-markdown';
import { MatPaginatorIntl } from '@angular/material/paginator';

// ==========================================================>> Custom Library
import { HelpersModule } from 'helpers';
import { ConfigModule } from 'helpers/services/config';
import { NavigationApiModule } from 'helpers/navigation-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { navigationApiServices } from './navigation';
import { CustomPaginator } from './shared/CustomPaginatorConfiguration';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    useHash: true,
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Helpers, Config & MockAPI
        HelpersModule,
        ConfigModule.forRoot(appConfig),
        NavigationApiModule.forRoot(navigationApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ],
    providers   : [
        { provide: MatPaginatorIntl, useValue: CustomPaginator() }
    ]
})
export class AppModule
{
}

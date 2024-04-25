// ==========================================================>> Core Library
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// ==========================================================>> Third Party Library
import 'hammerjs';

// ==========================================================>> Custom Library
import { environment } from 'environments/environment';
import { AppModule } from 'app/app.module';


if ( environment.production )
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

// ==========================================================>> Core Library
import { ModuleWithProviders, NgModule } from '@angular/core';

// ==========================================================>> Custom Library
import { ConfigService } from 'helpers/services/config/config.service';
import { APP_CONFIG } from 'helpers/services/config/config.constants';

@NgModule()
export class ConfigModule
{
    /**
     * Constructor
     */
    constructor(private _configService: ConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<ConfigModule>
    {
        return {
            ngModule : ConfigModule,
            providers: [
                {
                    provide : APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}

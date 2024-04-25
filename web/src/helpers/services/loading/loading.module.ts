// ==========================================================>> Core Library
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// ==========================================================>> Custom Library
import { LoadingInterceptor } from 'helpers/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
    ],
})
export class LoadingModule {}

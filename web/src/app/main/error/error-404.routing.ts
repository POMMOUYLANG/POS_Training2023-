// ==========================================================>> Core Library
import { Route } from '@angular/router';

// ==========================================================>> Custom Library
import { Error404Component } from 'app/main/error/error-404.component';

export const error404Routes: Route[] = [
    {
        path     : '',
        component: Error404Component
    }
];

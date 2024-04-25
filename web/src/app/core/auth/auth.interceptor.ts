import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    baseUrl = environment.API_BASE_URL;
    /**
     * Constructor
     */
    constructor(private router: Router) { }

    /**
     * Intercept
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem('accessToken');

        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err.url);
                    if (err.status === 401 || err.status === 403) {
                        if (this.router.url === '/auth/login') { }
                        else {
                            localStorage.clear();
                            this.router.navigate(['/auth/login']);
                        }
                    }
                }
                return throwError(err);
            })
        );
    }
}

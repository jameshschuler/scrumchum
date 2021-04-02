import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept ( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( request ).pipe( catchError( err => {
            const { error, statusText, status } = err;

            return throwError( {
                message: error.message,
                statusText: statusText,
                statusCode: error.status || status,
                title: error.title,
                errors: error.errors
            } );
        } ) )
    }
}
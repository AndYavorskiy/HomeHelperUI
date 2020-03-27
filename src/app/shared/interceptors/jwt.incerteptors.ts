import { Observable } from 'rxjs';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthorizationService } from "../services"

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authorizationService: AuthorizationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authorizationService.getAuthToken();

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            });
        }

        return next.handle(request);
    }
}

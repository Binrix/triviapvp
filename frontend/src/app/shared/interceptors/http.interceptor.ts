import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if(token) {
        const cloned = httpRequest.clone({
            headers: httpRequest.headers.set("Authorization",
                "Bearer " + token)
        });

        return next.handle(cloned);
    } else {
        return next.handle(httpRequest);
    }
  }
}
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<AppState>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => { return authState.user }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                else {
                    const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token) });
                    return next.handle(modifiedRequest);
                }
            }));

    }
}
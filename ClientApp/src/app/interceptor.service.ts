import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  baseUrl: string;
  constructor(private auth: AuthService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
   }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('REQ: ',req, ' vs ',this.baseUrl)
    const baseRegEx = new RegExp(this.baseUrl);
    // if(!baseRegEx.test(req.url)){
    //   return this.auth.getTokenSilently$().pipe(
    //     mergeMap(token => {
    //       const tokenReq = req.clone({
    //         setHeaders: { Authorization: `Bearer ${token}` }
    //       });
    //       return next.handle(tokenReq);
    //     }),
    //     catchError(err => throwError(err))
    //   );
    // }else{
    //   return next.handle(req);
    // }
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}

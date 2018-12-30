import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CoursesIntercepter implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq;
    if (req.url.includes('courses')) {
      clonedReq = req.clone({
        params: new HttpParams()
          .set('ts_intercepter', Date.now().toString())
      });
    } else {
      clonedReq = req;
    }
    return next.handle(clonedReq);
  }

}

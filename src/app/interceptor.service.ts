import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clone=req.clone({
      headers: req.headers.append('TOKEN',this.authService.token.value)
    });
    return next.handle(clone).pipe(catchError(e =>{
      if(e.status == 401){
        this.router.navigate(['/login']);
      }
      return throwError(e);
    }));
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  
  public handleError(error: HttpErrorResponse, errorCode: number,request:HttpRequest<unknown> ): Observable<never> {
    
    if (error.status == 401) {
      if(error.url?.toLowerCase() == "https://server-production-b300.up.railway.app/login/password"){
        this._errorService.msjError(error,"Upps ocurrio un error, Verfica Tu Usuario O Contraseña",
        "Credenciales No Validas")
        this.router.navigate(['/login'])
      }else{
        
        if(request.headers.get('authorization')!=null){
          this._errorService.msjError(error,"No tienes permitido Acceder a esta funcionalidad de la Aplicación",
        "Acceso No Permitido")
        this.router.navigate(['/login'])
        }else{
          this._errorService.msjError(error,"Inicia Sesión primero",
        "Acceso No Permitido")
        this.router.navigate(['/login'])
        } 
      }
    }
    return throwError(() => error)
  }
  
  constructor(private router: Router, private _errorService: ErrorService) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token')
    
    
    if (token) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}})
      
    }



    return  next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => 
      this.handleError(error, 404,request))
      
    );
  }
}


// ...


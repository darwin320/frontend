import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiService } from '../services/api/api.service';
import { catchError, map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends ApiService {
    
  
    private token: string | undefined;


  async login(email: string, password: string) {
    return this.observableToResult(
        this.httpClient.post(
            `${environment.endpoint}/login/password`,
            {
                email: email,
                password: password,
            },
            {
                withCredentials: true,
                responseType: "text",
            }
        )

         .pipe(
        map((result: any) => {
        
       // const tokenFormatted = result.match(/"token":"([^"]*)"/)[1];
        const token = JSON.parse(result).token;  
        //console.log(token)
        const decodedToken: any = jwt_decode(token);
        this.token = token
        return { token, decodedToken };
        }),
        catchError((error) => {
           
          if (error.name === "TokenExpiredError") {
            window.location.href = "/login";
          }
          return throwError(error);
        })
      )


    );
    
}

async logout() {
    return this.observableToResult<boolean>(
        this.httpClient.post(
            `${environment.endpoint}/logout`,
            {},
            {
                withCredentials: true,
            }
        )
    );
}



async canActivate() {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
    return await this.observableToResult<string>(
        this.httpClient.get(`${environment.endpoint}auth/canActivate`, {
            headers: headers,
            withCredentials: true,
            responseType: "text",
        })
    ).then((response) => {
        return response.ok && response.val === "OK";
    });
}


  
}

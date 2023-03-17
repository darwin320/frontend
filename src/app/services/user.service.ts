import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/userValidate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //va a hacer referencia a la ruta de local host que se configuro en las variable de entorno
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/user'
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }


  login(user:User):Observable<string>{
    console.log("ruta: " + `${this.myAppUrl}${this.myApiUrl}/login`);
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`,user)

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost/proyecto-construccion-back/users_api.php';

  constructor(private http: HttpClient)
  {

  }

  login(userName:string, password: string): Observable<User>
  {
    const body = {'userName':userName, 'password':password};
    console.log("url origen",this.apiUrl + "/authenticate");
    return this.http.post<User>(this.apiUrl + "/authenticate", body);
  }
}

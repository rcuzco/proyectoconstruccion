import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //private apiUrl = 'http://localhost/proyecto-construccion-back/users_api.php';
  private apiUrl = 'http://127.0.0.1:8000/users';


  constructor(private http: HttpClient)
  {

  }

  login(userName:string, password: string): Observable<User>
  {
    const body = {'userName':userName, 'password':password};
    console.log("url origen",this.apiUrl + "/authenticate");
    return this.http.post<User>(this.apiUrl + "/authenticate", body);
  }

  getData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  insertUser(usuario:User):Observable<number>{
    const dataToInsert = { "UserName": usuario.UserName, "password": usuario.Password, "UserType": usuario.UserType };
    return this.http.post<number>(this.apiUrl, dataToInsert);
  }

}

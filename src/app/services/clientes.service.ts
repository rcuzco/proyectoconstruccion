import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //private apiUrl = 'http://localhost/proyecto-construccion-back/customers_api.php';
  private apiUrl = 'http://127.0.0.1:8000/customers';


  constructor(private http: HttpClient) {}

  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  getCustomerIDByUserID(userID: number):Observable<Cliente>{
    //http://127.0.0.1:8000/customers/byuserid/8
    return this.http.get<Cliente>(`${this.apiUrl}/byuserid/${userID}`);
  }

  insertUser(cliente:Cliente):Observable<number>{

    const dataToInsert = { "UserName": cliente.UserName,"Password": cliente.Password, "UserType": cliente.UserType,
    "CustomerName":cliente.CustomerName, "ContactName": cliente.ContactName,
    "ContactEmail": cliente.ContactEmail, "ContactPhone": cliente.ContactPhone };
    return this.http.post<number>(this.apiUrl, dataToInsert);
  }

  login(userName:string, password: string): Observable<Cliente>
  {
    const body = {'userName':userName, 'password':password};
    console.log("url origen",this.apiUrl + "/authenticate");
    return this.http.post<Cliente>(this.apiUrl + "/authenticate", body);
  }


}

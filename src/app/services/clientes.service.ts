import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'http://localhost/proyecto-construccion-back/customers_api.php';

  constructor(private http: HttpClient) {}

  getData(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }
}

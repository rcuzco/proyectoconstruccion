import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  //private apiUrl = 'http://localhost/proyecto-construccion-back/providers_api.php';
  private apiUrl = 'http://127.0.0.1:8000/providers';


  constructor(private http: HttpClient)
  {

  }

  getData(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}`);
  }

  getDataById(id: number): Observable<Proveedor>
  {
      return this.http.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  insertProveedor(proveedor:Proveedor):Observable<number>{
    const dataToInsert = { "ProviderName": proveedor.ProviderName, "ContactName": proveedor.ContactName,
    "ContactEmail": proveedor.ContactEmail, "ContactPhone": proveedor.ContactPhone };
    return this.http.post<number>(this.apiUrl, dataToInsert);
  }

  updateProveedor(proveedor: Proveedor):Observable<Proveedor>
  {
    const dataToUpdate = {
      providerId: proveedor.ProviderID,
      ProviderName: proveedor.ProviderName,
      ContactName: proveedor.ContactName,
      ContactEmail: proveedor.ContactEmail,
      ContactPhone: proveedor.ContactPhone
    };

    let data = this.http.put<Proveedor>(this.apiUrl + '/' + proveedor.ProviderID, dataToUpdate);
    return data;
    }
  }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = 'http://localhost/proyecto-construccion-back/providers_api.php';

  constructor(private http: HttpClient)
  {

  }

  getData(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}`);
  }

  getDataById(id: number): Observable<Proveedor>
  {
      return this.http.get<Proveedor>(`${this.apiUrl}?id=${id}`);
  }

  insertProveedor(proveedor:Proveedor):Observable<number>{
    const dataToInsert = { "providerName": proveedor.ProviderName, "contactName": proveedor.ContactName, "contactEmail": proveedor.ContactEmail, "contactPhone": proveedor.ContactPhone };
    return this.http.post<number>(this.apiUrl, dataToInsert);
  }

  updateProveedor(proveedor: Proveedor):Observable<Proveedor>
  {
    const dataToUpdate = {
      providerId: proveedor.ProviderID,
      providerName: proveedor.ProviderName,
      contactName: proveedor.ContactName,
      contactEmail: proveedor.ContactEmail,
      contactPhone: proveedor.ContactPhone
    };

    let data = this.http.put<Proveedor>(this.apiUrl, dataToUpdate);
    return data;
    }
  }


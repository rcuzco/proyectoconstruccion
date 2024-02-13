import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';
import { MaterialStock } from '../models/materialstock';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService
{
  private apiUrl = 'http://localhost/proyecto-construccion-back/budgets_api.php';

  constructor(private http: HttpClient)
  {

  }

  getData(id:number): Observable<Budget[]>
  {
    return this.http.get<Budget[]>(`${this.apiUrl}?id=${id}`);
  }

  add(material: MaterialStock|undefined, customerId: number|undefined): Observable<boolean> {
    //necesitamos customerID, materialId, providerId
    const dataToInsert = { "materialId": material?.MaterialID, "providerId": material?.ProviderId, "customerId": customerId, "quantity" : material?.Quantity };
        return this.http.post<boolean>(this.apiUrl, dataToInsert);
  }

}

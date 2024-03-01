import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialStock } from '../models/materialstock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesClienteService {



  //private apiUrl = 'http://localhost/proyecto-construccion-back/materials_clients_api.php';
  private apiUrl = 'http://127.0.0.1:8000/materials';
  private apiUrlMaterialStock = 'http://127.0.0.1:8000/materialstock';

  constructor(private http: HttpClient) { }

  getData(): Observable<MaterialStock[]>
  {
      return this.http.get<MaterialStock[]>(`${this.apiUrl}`);
  }

  getMaterialStockData(): Observable<MaterialStock[]>
  {
      return this.http.get<MaterialStock[]>(`${this.apiUrlMaterialStock}`);
  }

}

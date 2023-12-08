import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root',
})
export class MaterialesService {

  private apiUrl = 'http://localhost/proyecto-construccion-back/materials_api.php';

  constructor(private http: HttpClient) {}

  getData(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}`);
  }

  getDataById(id:number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}?id=${id}`);
  }

  insertMaterial(material:Material):Observable<number>{
    const dataToInsert = { "materialName": material.MaterialName, "description": material.Description, "imageUrl": material.ImageUrl };
    return this.http.post<number>(this.apiUrl, dataToInsert);
  }

  deleteMaterial(materialId: number): Observable<string> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        materialId: materialId
      },
    };

    let data = this.http.delete<string>(this.apiUrl, options);
    return data;
  }

}

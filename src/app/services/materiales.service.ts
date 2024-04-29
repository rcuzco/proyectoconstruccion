import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialStock } from '../models/materialstock';
import { Material } from '../models/material';

@Injectable({
    providedIn: 'root',
})
export class MaterialesService
{


    //private apiUrl = 'http://localhost/proyecto-construccion-back/materials_api.php';
    private apiUrl = 'http://127.0.0.1:8000/materials';


    constructor(private http: HttpClient) { }

    getData(): Observable<MaterialStock[]>
    {
        return this.http.get<MaterialStock[]>(`${this.apiUrl}`);
    }

    getDataById(id: number): Observable<Material>
    {
        return this.http.get<Material>(`${this.apiUrl}/${id}`);
    }

    insertMaterial(material: MaterialStock): Observable<number>
    {
        const dataToInsert = { "MaterialName": material.MaterialName, "Description": material.Description, "ImageUrl": material.ImageUrl };
        return this.http.post<number>(this.apiUrl, dataToInsert);
    }

    deleteMaterial(materialId: number): Observable<string>
    {
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

    updateMaterial(material: Material): Observable<Material>
    {
        const dataToUpdate = {
            materialId: material.MaterialId,
            materialName: material.MaterialName,
            description: material.Description,
            imageUrl: material.ImageUrl,
            imageFile: material.ImageFile
        };

        const imageFile:any = material.ImageFile;

        const myFormData = new FormData();
        myFormData.append('materialId', dataToUpdate.materialId.toString());
        myFormData.append('materialName', dataToUpdate.materialName.toString());
        myFormData.append('description', dataToUpdate.description.toString());
        myFormData.append('imageUrl', dataToUpdate.imageUrl.toString());
        myFormData.append('image', imageFile);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        console.log("myFormData",myFormData);

        let data = this.http.post<Material>(this.apiUrl + '/' + material.MaterialId, myFormData, { headers: headers });
        return data;
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sale } from '../models/sale';
import { MaterialStock } from '../models/materialstock';
import { SaleData } from '../models/sale-data';
import { SaleDetailsData } from '../models/sale-details-data';
import { SaleDetailDataToInsert } from '../models/sale-detail-data-to-insert';
import { SaleDataModel, SaleDataModelRaw } from '../models/sale-data-model';


@Injectable({
    providedIn: 'root'
  })
  export class FacturasService
  {
    //private apiUrl = 'http://localhost/proyecto-construccion-back/budgets_api.php';
    private apiUrl = 'http://127.0.0.1:8000/sales';
    private apiUrlSaleDetails = 'http://127.0.0.1:8000/sale_details';
    private apiUrlCompleteSaleDetails = 'http://127.0.0.1:8000/salescomplete';


    constructor(private http: HttpClient)
    {

    }

    getData(id: number): Observable<Sale[]>
    {
      return this.http.get<Sale[]>(`${this.apiUrl}/${id}`);
    }

    add(material: MaterialStock | undefined, customerId: number | undefined): Observable<boolean>
    {
      //necesitamos customerID, materialId, providerId
      const dataToInsert = { "materialId": material?.MaterialID, "providerId": material?.ProviderId, "customerId": customerId, "quantity": material?.Quantity};
      return this.http.post<boolean>(this.apiUrl, dataToInsert);
    }

    createSale(customerId: number): Observable<SaleData>
    {
      const currentDate: Date = new Date();
      const dataToInsert =
      {
        "SaleDate": currentDate.toISOString().slice(0, 10),
        "customers_CustomerID": customerId
      };
  console.log("dataToInsert",dataToInsert);
      return this.http.post<any>(this.apiUrl, dataToInsert).pipe(
        map(response => response.sale) // Extract the 'budget' object from the response
      );
    }

    addProductToSaleDetails(productData: SaleDetailDataToInsert): Observable<SaleDetailsData>
    {

      return this.http.post<any>(`${this.apiUrlSaleDetails}`, productData).pipe(
        map(response => response.saleDetails) // Extract the 'budget' object from the response
      );
    }

    getSaleData(id: number): Observable<SaleDataModel>
    {
      return this.http.get<SaleDataModel>(`${this.apiUrlCompleteSaleDetails}/${id}`);
    }

    getSaleDataRaw(id: number): Observable<SaleDataModelRaw[]>
    {
      return this.http.get<SaleDataModelRaw[]>(`${this.apiUrlCompleteSaleDetails}/${id}`);
    }

    eliminarFacturaDetalle(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrlSaleDetails}/${id}`);
    }




  }

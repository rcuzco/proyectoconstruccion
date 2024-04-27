import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialStock } from '../models/materialstock';
import { Stock } from '../models/stock';

@Injectable({
    providedIn: 'root'
})
export class StockService
{
    //private apiUrl = 'http://localhost/proyecto-construccion-back/stock_api.php';
    private apiUrl = 'http://127.0.0.1:8000/stocks';


    constructor(private http: HttpClient) { }

    getStockByMaterial(materialId: number): Observable<MaterialStock[]>
    {
        return this.http.get<MaterialStock[]>(`${this.apiUrl}/material/${materialId}`);
    }

    getStockById(stockId: number): Observable<MaterialStock>
    {
        return this.http.get<MaterialStock>(`${this.apiUrl}/details/${stockId}`);
    }

    //insert new stock
    addStock(stock: Stock): Observable<number>
    {
        const dataToInsert =
        {
            "materials_MaterialId": stock.MaterialId,
            "providers_ProviderId": stock.ProviderId,
            "Quantity": stock.Quantity,
            "UnitPrice": stock.UnitPrice
        };
        return this.http.post<number>(this.apiUrl, dataToInsert);
    }

    updateStock(stock: Stock):Observable<Stock>
    {
        const dataToUpdate =
        {
            "StockId": stock.StockId,
            "Quantity": stock.Quantity,
            "UnitPrice": stock.UnitPrice
        };
        return this.http.put<Stock>(this.apiUrl + '/' + stock.StockId, dataToUpdate);
    }
}

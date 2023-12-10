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
    private apiUrl = 'http://localhost/proyecto-construccion-back/stocks_api.php';

    constructor(private http: HttpClient) { }

    getStockByMaterial(materialId: number): Observable<MaterialStock[]>
    {
        return this.http.get<MaterialStock[]>(`${this.apiUrl}?method=getStockByMaterialId&materialId=${materialId}`);
    }

    getStockById(stockId: number): Observable<MaterialStock>
    {
        return this.http.get<MaterialStock>(`${this.apiUrl}?method=getStockByStockId&stockId=${stockId}`);
    }

    //insert new stock
    addStock(stock: Stock): Observable<number>
    {
        const dataToInsert =
        {
            "materialId": stock.MaterialId,
            "providerId": stock.ProviderId,
            "quantity": stock.Quantity,
            "unitPrice": stock.UnitPrice
        };
        return this.http.post<number>(this.apiUrl, dataToInsert);
    }

    updateStock(stock: Stock):Observable<Stock>
    {
        const dataToUpdate =
        {
            "stockId": stock.StockId,
            "quantity": stock.Quantity,
            "unitPrice": stock.UnitPrice
        };
        return this.http.put<Stock>(this.apiUrl, dataToUpdate);
    }
}

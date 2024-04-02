import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Budget } from '../models/budget';
import { MaterialStock } from '../models/materialstock';
import { BudgetData } from '../models/budget-data';
import { BudgetDetailsData } from '../models/budget-details-data';
import { BudgetDetailDataToInsert } from '../models/budget-detail-data-to-insert';
import { BudgetDataModel } from '../models/budget-data-model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService
{
  //private apiUrl = 'http://localhost/proyecto-construccion-back/budgets_api.php';
  private apiUrl = 'http://127.0.0.1:8000/budgets';
  private apiUrlBudgetDetails = 'http://127.0.0.1:8000/budget_details';
  private apiUrlCompleteBudgetDetails = 'http://127.0.0.1:8000/budgetscomplete';


  constructor(private http: HttpClient)
  {

  }

  getData(id: number): Observable<Budget[]>
  {
    return this.http.get<Budget[]>(`${this.apiUrl}/${id}`);
  }

  add(material: MaterialStock | undefined, customerId: number | undefined): Observable<boolean>
  {
    //necesitamos customerID, materialId, providerId
    const dataToInsert = { "materialId": material?.MaterialID, "providerId": material?.ProviderId, "customerId": customerId, "quantity": material?.Quantity };
    return this.http.post<boolean>(this.apiUrl, dataToInsert);
  }

  createBugdet(customerId: number): Observable<BudgetData>
  {
    const currentDate: Date = new Date();
    const dataToInsert =
    {
      "BudgetDate": currentDate.toISOString().slice(0, 10),
      "customers_CustomerID": customerId
    };
console.log("dataToInsert",dataToInsert);
    return this.http.post<any>(this.apiUrl, dataToInsert).pipe(
      map(response => response.budget) // Extract the 'budget' object from the response
    );
  }

  addProductToBudgetDetails(productData: BudgetDetailDataToInsert): Observable<BudgetDetailsData>
  {

    return this.http.post<any>(`${this.apiUrlBudgetDetails}`, productData).pipe(
      map(response => response.budgetDetails) // Extract the 'budget' object from the response
    );
  }

  getBudgetData(id: number): Observable<BudgetDataModel>
  {
    return this.http.get<BudgetDataModel>(`${this.apiUrlCompleteBudgetDetails}/${id}`);
  }

}

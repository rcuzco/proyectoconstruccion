import { BudgetDetailDataModel } from "./budget-detail-data-model";
import { Cliente } from "./cliente";

export interface BudgetDataModel
{
  /*
  b.BudgetID,b.BudgetDate,b.customers_CustomerID,c.CustomerName
  */
  BudgetID: number;
  BudgetDate: Date;
  customers_CustomerID: number;
  customer:             Cliente;
  details:              BudgetDetailDataModel[];
}

export interface BudgetDataModelRaw {
    BudgetID: number
    BudgetDate: string
    customers_CustomerID: number
    BudgetDetailID: number
    budgets_BudgetID: number
    materials_MaterialID: number
    providers_ProviderID: number
    Quantity: number
    CustomerID: number
    CustomerName: string
    ContactName: string
    ContactEmail: string
    ContactPhone: string
    UserName: string
    Password: string
    UserType: string
    MaterialID: number
    MaterialName: string
    Description: string
    ImageUrl: string
    Category: string
    ProviderID: number
    ProviderName: string
    StockID: number
    LastUpdate: string
    UnitPrice: string
  }


import { SaleDetailDataModel } from "./sale-detail-data-model";
import { Cliente } from "./cliente";

export interface SaleDataModel
{
  /*
  s.SaleID,s.SaleDate,s.customers_CustomerID,c.CustomerName
  */
  SaleID: number;
  SaleDate: Date;
  customers_CustomerID: number;
  customer:             Cliente;
  details:              SaleDetailDataModel[];
}

export interface SaleDataModelRaw {
    SaleID: number
    SaleDate: string
    customers_CustomerID: number
    SaleDetailID: number
    sales_SaleID: number
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

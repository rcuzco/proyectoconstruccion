import { MaterialData } from "./material";
import { Proveedor } from "./proveedor";
import { StockData } from "./stock";

export interface SaleDetailDataModel
{
  SaleDetailID: number;
  sales_SaleID: number;
  materials_MaterialID: number;
  providers_ProviderID: number;
  Quantity: number;
  material:             MaterialData;
  providers:            Proveedor;
  stock: StockData;
}

import { MaterialData } from "./material";
import { Proveedor } from "./proveedor";

export interface BudgetDetailDataModel
{
  BudgetDetailID: number;
  budgets_BudgetID: number;
  materials_MaterialID: number;
  providers_ProviderID: number;
  Quantity: number;
  material:             MaterialData;
  providers:            Proveedor;
}

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

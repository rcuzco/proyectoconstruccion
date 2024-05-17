export interface SaleData
{
  SaleDate: Date,
  customers_CustomerID: number,
  address: string,
  postalCode: number,
  created_at: Date,
  updated_at: Date,
  SaleID:number
  total:number;
}


export interface SaleDataToUpdate
{
  SaleDate: string,
  customers_CustomerID: number,
  address: string,
  postalCode: number,
  created_at: string,
  updated_at: string,
  SaleID:number
  total:number;
}

export interface Stock {
  StockId: number;
  MaterialId: number;
  ProviderId: number;
  Quantity: number;
  UnitPrice: number;
}

export interface StockData {
    StockID: number;
    providers_ProviderID: number;
    materials_MaterialID: number;
    Quantity: number;
    UnitPrice: number;
    LastUpdate: Date;
  }



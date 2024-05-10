import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetDetailDataToInsert } from 'src/app/models/budget-detail-data-to-insert';
import { SaleDetailDataToInsert} from 'src/app/models/sale-detail-data-to-insert';
import { MaterialStock } from 'src/app/models/materialstock';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { MaterialesClienteService } from 'src/app/services/materiales-cliente.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { FacturasService } from 'src/app/services/facturas.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-electricidad',
  templateUrl: './electricidad.component.html',
  styleUrls: ['./electricidad.component.scss']
})
export class ElectricidadComponent implements OnInit {

    public materiales: MaterialStock[] = [];

  constructor(private materialesService: MaterialesClienteService, private facturasService: FacturasService, private router: Router, private presupuestoService: PresupuestosService, private globalDataService: GlobalDataService, private clienteService: ClientesService) { }

  ngOnInit(): void
  {
    this.materialesService.getMaterialStockData().subscribe(data =>
    {
      console.log("materiales", data);
      this.materiales = data;
    })
  }

  goToDetails(materialId: number)
  {
    this.router.navigate(["dashboard/materiales", materialId]);
  }

  addToWhishlist(materialId: number, providerId: number)
  {

    const customerId = this.globalDataService.getUsuarioLogado()?.CustomerID;
    console.log("customerId", customerId);
    let material: MaterialStock | undefined = this.materiales.find(m => m.MaterialID === materialId && m.ProviderId === providerId);
    //material?.Quantity = 1;
    this.presupuestoService.add(material, customerId).subscribe(data =>
    {
      console.log("material agregado al presupuesto", data);
    });
  }

  addToSalelist(materialId: number, providerId: number)
  {

    const customerId = this.globalDataService.getUsuarioLogado()?.CustomerID;
    console.log("customerId", customerId);
    let material: MaterialStock | undefined = this.materiales.find(m => m.MaterialID === materialId && m.ProviderId === providerId);
    //material?.Quantity = 1;
    this.facturasService.add(material, customerId).subscribe(data =>
    {
      console.log("material agregado a la factura", data);
    });
  }


  async addProductToBudget(materialId: number, providerId: number): Promise<void> {
    const userID = this.globalDataService.getUsuarioLogado()?.CustomerID as number;
    const customer = await this.clienteService.getCustomerIDByUserID(userID).toPromise();
    const customerId = customer?.CustomerID as number;

    // Check if there is a budget id in the local storage
    const budgetId = localStorage.getItem('budgetId') as number | null;
    if (budgetId) {
        // Step 2: Add the product to budgetDetails
        const productData: BudgetDetailDataToInsert = {
            budgets_BudgetID: budgetId,
            materials_MaterialID: materialId,
            providers_ProviderID: providerId,
            Quantity: 1
        };
        this.presupuestoService.addProductToBudgetDetails(productData).subscribe(
            (response) => {
                // Handle success with modal
                const modalElement = document.getElementById('successModal');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.log("material agregado al presupuesto", productData);
            },
            (error) => {
                // Handle error with modal
                const modalElement = document.getElementById('errorModal');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.error('Error adding product to budgetDetails:', error);
            }
        );
    } else {
        // No budget, so we create a new one and add the product
        this.presupuestoService.createBugdet(customerId).subscribe(
            (budgetResponse) => {
                const budgetId = budgetResponse.BudgetID;
                localStorage.setItem('budgetId', budgetId.toString());

                // Step 2: Add the product to budgetDetails
                const productData: BudgetDetailDataToInsert = {
                    budgets_BudgetID: budgetId,
                    materials_MaterialID: materialId,
                    providers_ProviderID: providerId,
                    Quantity: 1
                };
                this.presupuestoService.addProductToBudgetDetails(productData).subscribe(
                    (response) => {
                        // Handle success with modal
                        const modalElement = document.getElementById('successModal');
                        const modal = new bootstrap.Modal(modalElement!);
                        modal.show();
                        console.log("material agregado al presupuesto", productData);
                    },
                    (error) => {
                        // Handle error with modal
                        const modalElement = document.getElementById('errorModal');
                        const modal = new bootstrap.Modal(modalElement!);
                        modal.show();
                        console.error('Error adding product to budgetDetails:', error);
                    }
                );
            },
            (error) => {
                // Handle error with modal
                const modalElement = document.getElementById('errorModal');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.error('Error creating budget:', error);
            }
        );
    }
}

async addProductToSale(materialId: number, providerId: number): Promise<void> {
    const userID = this.globalDataService.getUsuarioLogado()?.CustomerID as number;
    const customer = await this.clienteService.getCustomerIDByUserID(userID).toPromise();
    const customerId = customer?.CustomerID as number;

    // Check if there is a budget id in the local storage
    const saleId = localStorage.getItem('saleId') as number | null;
    if (saleId) {
        // Step 2: Add the product to budgetDetails
        const productData: SaleDetailDataToInsert = {
            sales_SaleID: saleId,
            materials_MaterialID: materialId,
            providers_ProviderID: providerId,
            Quantity: 1
        };
        this.facturasService.addProductToSaleDetails(productData).subscribe(
            (response) => {
                // Handle success with modal
                const modalElement = document.getElementById('successModal1');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.log("material agregado a la factura", productData);
            },
            (error) => {
                // Handle error with modal
                const modalElement = document.getElementById('errorModal1');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.error('Error adding product to saleDetails:', error);
            }
        );
    } else {
        // No budget, so we create a new one and add the product
        this.facturasService.createSale(customerId).subscribe(
            (saleResponse) => {
                const saleId = saleResponse.SaleID;
                localStorage.setItem('saleId', saleId.toString());

                // Step 2: Add the product to budgetDetails
                const productData: SaleDetailDataToInsert = {
                    sales_SaleID: saleId,
                    materials_MaterialID: materialId,
                    providers_ProviderID: providerId,
                    Quantity: 1
                };
                this.facturasService.addProductToSaleDetails(productData).subscribe(
                    (response) => {
                        // Handle success with modal
                        const modalElement = document.getElementById('successModal1');
                        const modal = new bootstrap.Modal(modalElement!);
                        modal.show();
                        console.log("material agregado al la factura", productData);
                    },
                    (error) => {
                        // Handle error with modal
                        const modalElement = document.getElementById('errorModal1');
                        const modal = new bootstrap.Modal(modalElement!);
                        modal.show();
                        console.error('Error adding product to saleDetails:', error);
                    }
                );
            },
            (error) => {
                // Handle error with modal
                const modalElement = document.getElementById('errorModal1');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();
                console.error('Error creating sale:', error);
            }
        );
    }
}

confirmAddToBudget(materialId: number, providerId: number): void {
    const modalElement = document.getElementById('confirmModal');
    const modal = new bootstrap.Modal(modalElement!); // El operador '!' indica que modalElement no será null
    modal.show();

    const confirmButton = modalElement?.querySelector('#confirmButton');
    confirmButton?.addEventListener('click', () => {
        modal.hide();
        this.addProductToBudget(materialId, providerId);
    });

    const cancelButton = modalElement?.querySelector('#cancelButton');
    cancelButton?.addEventListener('click', () => {
        modal.hide();
    });
}

confirmAddToSale(materialId: number, providerId: number): void {
    const modalElement = document.getElementById('confirmModal1');
    const modal = new bootstrap.Modal(modalElement!); // El operador '!' indica que modalElement no será null
    modal.show();

    const confirmButton = modalElement?.querySelector('#confirmButton1');
    confirmButton?.addEventListener('click', () => {
        modal.hide();
        this.addProductToSale(materialId, providerId);
    });

    const cancelButton = modalElement?.querySelector('#cancelButton1');
    cancelButton?.addEventListener('click', () => {
        modal.hide();
    });
}

  handleImageError(material: MaterialStock)
  {
    console.log("Error al cargar la imagen");
    material.ShowGenericImage = true;
  }

}

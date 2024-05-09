import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetDetailDataToInsert } from 'src/app/models/budget-detail-data-to-insert';
import { MaterialStock } from 'src/app/models/materialstock';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { MaterialesClienteService } from 'src/app/services/materiales-cliente.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-suelos-revestimientos',
  templateUrl: './suelos-revestimientos.component.html',
  styleUrls: ['./suelos-revestimientos.component.scss']
})
export class SuelosRevestimientosComponent implements OnInit {
    public materiales: MaterialStock[] = [];

    constructor(private materialesService: MaterialesClienteService, private router: Router, private presupuestoService: PresupuestosService, private globalDataService: GlobalDataService, private clienteService: ClientesService) { }

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

    handleImageError(material: MaterialStock)
    {
      console.log("Error al cargar la imagen");
      material.ShowGenericImage = true;
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetDetailDataToInsert } from 'src/app/models/budget-detail-data-to-insert';
import { MaterialStock } from 'src/app/models/materialstock';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { MaterialesClienteService } from 'src/app/services/materiales-cliente.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',



  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

    public materiales: MaterialStock[] = [];
    public proveedores: Proveedor[] = [];
    public clientes: Cliente[] = [];

    constructor(private materialesService: MaterialesClienteService, private proveedorService: ProveedoresService, private router: Router, private presupuestoService: PresupuestosService, private globalDataService: GlobalDataService, private clienteService: ClientesService) { }

    ngOnInit(): void
    {
      this.materialesService.getMaterialStockData().subscribe(data =>
      {
        console.log("materiales", data);
        this.materiales = data;
      })

      this.proveedorService.getData().subscribe(data1 =>
      {
        console.log("proveedor", data1);
        this.proveedores = data1;
      })

      console.log("Cargando clientes");
      this.clienteService.getData().subscribe(data2 => {
        this.clientes = data2;
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


    async addProductToBudget(materialId: number, providerId: number)
    {

      const userID = this.globalDataService.getUsuarioLogado()?.CustomerID as number;
      const customer = await this.clienteService.getCustomerIDByUserID(userID).toPromise();
      const customerId = customer?.CustomerID as number;

      //check if there is a budget id in the local storage
      const budgetId = localStorage.getItem('budgetId') as number | null;
      if (budgetId)
      {
        // Step 2: Add the product to budgetDetails
        const productData:BudgetDetailDataToInsert =
        {
          budgets_BudgetID: budgetId,
          materials_MaterialID: materialId,
          providers_ProviderID: providerId,
          Quantity: 1
        };
        this.presupuestoService.addProductToBudgetDetails(productData).subscribe(
          (response) =>
          {
            // Handle success
            alert('material agregado con éxito');
            console.log("material agregado al presupuesto", productData);
          },
          (error) =>
          {
            // Handle error
            console.error('Error adding product to budgetDetails:', error);
          }
        );
      }
      else
      {
        //no budget, so we create a new one and add the product
        this.presupuestoService.createBugdet(customerId).subscribe(
          (budgetResponse) =>
          {
            const budgetId = budgetResponse.BudgetID; // Assuming your backend returns the created budget ID
            localStorage.setItem('budgetId', budgetId.toString());

            // Step 2: Add the product to budgetDetails
            const productData:BudgetDetailDataToInsert =
            {
              budgets_BudgetID: budgetId,
              materials_MaterialID: materialId,
              providers_ProviderID: providerId,
              Quantity: 1
            };
            this.presupuestoService.addProductToBudgetDetails(productData).subscribe(
              (response) =>
              {
                // Handle success
                alert('material agregado con éxito');
                console.log("material agregado al presupuesto", productData);
              },
              (error) =>
              {
                // Handle error
                console.error('Error adding product to budgetDetails:', error);
              }
            );
          },
          (error) =>
          {
            // Handle error
            console.error('Error creating budget:', error);
          }
        );
      }
    }

    confirmAddToBudget(materialId: number, providerId: number): void {
      const confirmed = window.confirm('¿Seguro de agregar el producto seleccionado?');
      if (confirmed) {
        this.addProductToBudget(materialId, providerId);
      }
    }

    handleImageError(material: MaterialStock)
    {
      console.log("Error al cargar la imagen");
      material.ShowGenericImage = true;
    }

}

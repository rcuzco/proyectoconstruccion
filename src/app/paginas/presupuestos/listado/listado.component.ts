import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataModel } from 'src/app/models/budget-data-model';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { ExportService } from 'src/app/services/export.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  budgetId: number | null = 0;
  datosPresupuesto: BudgetDataModel | null = null;
  budgetData: BudgetDataModel | null = null;

  constructor(
    private router: Router,
    private presupuestosService: PresupuestosService,
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.budgetId = this.globalDataService.getIdPresupuestoActual();


      console.log("Received id:", this.budgetId);

      if (this.budgetId == null) {
        // alert("no hay presupuesto creado de momento.");
      }

      this.presupuestosService.getBudgetData(this.budgetId as number).subscribe({
        next: (data: BudgetDataModel) => {
          console.log("presupuesto", data);
          this.datosPresupuesto = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("complete");
        }
      });
    });
  }

  eliminarRegistro(id: number | null): void {
    if (id !== null) {
      this.presupuestosService.eliminarPresupuestoDetalle(id).subscribe({
        next: () => {
          console.log("Registro eliminado con éxito");
          this.refreshTableData();
        },
        error: (err) => {
            console.log(id)
          console.log('Error al eliminar el registro:', err);
        }
      });
    } else {
      console.log('El ID del presupuesto es nulo.');
    }
  }

  refreshTableData(): void {
    // Aquí vuelves a obtener los datos del presupuesto
    this.presupuestosService.getBudgetData(this.budgetId as number).subscribe({
        next: (data: any) => {
            // Actualizas los datos en la variable datosPresupuesto
            this.datosPresupuesto = data;
        },
        error: (err) => {
            console.log('Error al actualizar los datos de la tabla:', err);
        }
    });
}

private getTableData(): any[] {
    // Verificar si hay datos del presupuesto
    if (!this.datosPresupuesto || !this.datosPresupuesto.details) {
      return [];
    }

    // Crear un arreglo para almacenar los datos de la tabla
    const tableData: any[] = [];

    // Iterar sobre los detalles del presupuesto
    this.datosPresupuesto.details.forEach((item, index) => {
      const rowData: any[] = [];

      // Agregar los datos de cada columna
      rowData.push(index + 1); // Número de fila
      rowData.push(item.material.MaterialName); // Nombre del material
      rowData.push(item.material.ImageUrl); // URL de la imagen
      rowData.push(item.Quantity); // Cantidad
      rowData.push(item.providers.ProviderName); // Nombre del proveedor
      rowData.push(item.material.MaterialID); // ID del material

      // Agregar la fila al arreglo de datos de la tabla
      tableData.push(rowData);
    });

    return tableData;
  }


  exportToPDF(): void {
    const tableData: any[] = this.getTableData1(); // Asegúrate de que getTableData devuelve una matriz con la estructura adecuada
    this.exportService.exportToPDFPresupuesto(tableData, 'presupuesto');
  }

  private getTableData1(): any[] {
    // Crear una matriz para los datos de la tabla
    const tableData: any[] = [];

    // Verificar si hay datos
    if (this.datosPresupuesto && this.datosPresupuesto.details) {
      // Iterar sobre los datos y agregar cada fila a la matriz de datos de la tabla
      this.datosPresupuesto.details.forEach((budgetDetail, index) => {
        const rowData = [
          index + 1, // Número de fila
          budgetDetail.material.MaterialName, // Nombre del producto
          budgetDetail.material.ImageUrl, // URL de la imagen
          budgetDetail.Quantity, // Cantidad
          budgetDetail.providers.ProviderName, // Nombre del proveedor
          budgetDetail.material.MaterialID // Precio
        ];
        tableData.push(rowData);
      });
    }

    return tableData;
  }


  exportToExcel(): void {
    const tableData = this.getTableData();
    this.exportService.exportToExcelPresupuesto(tableData);
  }


  contador: number = 1;

    incrementarContador(): void {
    this.contador++;
}



}


    // incrementarCantidad(material: BudgetDataModel): void {
    //     material.cantidad++;
    //   }

    //   decrementarCantidad(material: BudgetDataModel): void {
    //     if (material.cantidad > 1) {
    //       material.cantidad--;
    //     }
    //   }

    //   calcularTotal(): number {
    //     let total = 0;
    //     for (const material of this.materiales) {
    //       total += material.precio * material.cantidad;
    //     }
    //     return total;
    //   }

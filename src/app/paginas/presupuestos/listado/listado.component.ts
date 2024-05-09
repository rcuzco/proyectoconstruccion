import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataModel, BudgetDataModelRaw } from 'src/app/models/budget-data-model';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { ExportService } from 'src/app/services/export.service';
import jsPDF from 'jspdf';
import { BudgetDetailDataModel } from 'src/app/models/budget-detail-data-model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {

  budgetId: number | null = 0;
  datosPresupuesto: BudgetDataModelRaw[] | null = null;
  budgetData: BudgetDataModel | null = null;
  subTotal: number = 0;
  iva: number = 0;
  total: number = 0;

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

      this.presupuestosService.getBudgetDataRaw(this.budgetId as number).subscribe({
        next: (data: BudgetDataModelRaw[]) => {
          this.datosPresupuesto = data;
          this.calcularTotal(this.datosPresupuesto);
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
    if (!this.datosPresupuesto || !this.datosPresupuesto) {
      return [];
    }

    // Crear un arreglo para almacenar los datos de la tabla
    const tableData: any[] = [];

    // Iterar sobre los detalles del presupuesto
    this.datosPresupuesto.forEach((item, index) => {
      const rowData: any[] = [];

      // Agregar los datos de cada columna
      rowData.push(index + 1); // Número de fila
      rowData.push(item.MaterialName); // Nombre del material
      rowData.push(item.ImageUrl); // URL de la imagen
      rowData.push(item.Quantity); // Cantidad
      rowData.push(item.ProviderName); // Nombre del proveedor
      rowData.push(item.MaterialID); // ID del material

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
    if (this.datosPresupuesto && this.datosPresupuesto) {
      // Iterar sobre los datos y agregar cada fila a la matriz de datos de la tabla
      this.datosPresupuesto.forEach((budgetDetail, index) => {
        const rowData = [
          index + 1, // Número de fila
          budgetDetail.MaterialName, // Nombre del producto
          budgetDetail.ImageUrl, // URL de la imagen
          budgetDetail.Quantity, // Cantidad
          budgetDetail.ProviderName, // Nombre del proveedor
          budgetDetail.MaterialID // Precio
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

    recalcularTotal(datosEvento: any, item: BudgetDataModelRaw)
    {
        this.subTotal = 0;
        this.iva  = 0;
        this.total  = 0;
        let cantidad: number  = parseInt(datosEvento.srcElement.value);
        if (this.datosPresupuesto && this.datosPresupuesto)
        {
            for (let index = 0; index < this.datosPresupuesto.length; index++)
            {
                if (item.BudgetDetailID === this.datosPresupuesto[index].BudgetDetailID)
                {
                    this.datosPresupuesto[index].Quantity = cantidad;
                    break;
                }
            }
            this.calcularTotal(this.datosPresupuesto);
        }
        // let unitPrice = item.stock.UnitPrice;
        // this.subTotal = cantidad * unitPrice;
        // this.iva = this.subTotal * 0.21;
        // this.total = this.subTotal + this.iva;
        // console.log(datosEvento.srcElement.value);
    }

    calcularTotal(items: BudgetDataModelRaw[])
    {
        for (let index = 0; index < items.length; index++)
        {
            const item = items[index];

            let cantidad = item.Quantity;
            let unitPrice = parseFloat(item.UnitPrice);
            this.subTotal += (cantidad * unitPrice);
            this.iva += (cantidad * unitPrice) * 0.21;
        }
        this.total = this.subTotal + this.iva;



    }

}


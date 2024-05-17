import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleDataModel, SaleDataModelRaw } from 'src/app/models/sale-data-model';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { ExportService } from 'src/app/services/export.service';
import jsPDF from 'jspdf';
import { SaleDetailDataModel } from 'src/app/models/sale-detail-data-model';
import { SaleData, SaleDataToUpdate } from 'src/app/models/sale-data';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-listadoFactura',
  templateUrl: './listadoFactura.component.html',
  styleUrls: ['./listadoFactura.component.scss']
})
export class ListadoFacturaComponent {



  saleId: number | null = 0;
  datosFactura: SaleDataModelRaw[] | null = null;
  saleData: SaleDataModel | null = null;
  subTotal: number = 0;
  iva: number = 0;
  total: number = 0;
    envio: string = '';
direccionEnvio: string = '';
direccionEnvioCodigoPostal: number = 0;

  constructor(
    private router: Router,
    private facturasService: FacturasService,
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.saleId = this.globalDataService.getIdFacturaActual();


      console.log("Received id:", this.saleId);

      if (this.saleId == null) {
        // alert("no hay presupuesto creado de momento.");
      }

      this.facturasService.getSaleDataRaw(this.saleId as number).subscribe({
        next: (data: SaleDataModelRaw[]) => {
          this.datosFactura = data;
          console.clear();
          console.log("this.datosFactura",this.datosFactura);
          this.calcularTotal(this.datosFactura);
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
        this.facturasService.eliminarFacturaDetalle(id).subscribe({
            next: () => {
                console.log("Registro eliminado con éxito");
                this.refreshTableData(); // Actualizar los datos de la tabla

                // Verificar si datosPresupuesto no es null antes de restar el valor del producto eliminado
                if (this.datosFactura !== null) {
                    // Encuentra el índice del elemento eliminado
                    const index = this.datosFactura.findIndex(item => item.SaleDetailID === id);
                    if (index !== -1) {
                        const itemEliminado = this.datosFactura[index];
                        // Restar el valor del producto eliminado a los totales
                        this.subTotal -= parseFloat(itemEliminado.UnitPrice) * itemEliminado.Quantity;
                        this.iva -= parseFloat(itemEliminado.UnitPrice) * itemEliminado.Quantity * 0.21;
                        this.total = this.subTotal + this.iva;
                    }
                    // Eliminar el elemento de la lista de datosPresupuesto
                    this.datosFactura.splice(index, 1);
                    // Verificar si la lista está vacía después de eliminar el registro
                    if (this.datosFactura.length === 0) {
                        // Inicializar datosPresupuesto como un arreglo vacío
                        this.datosFactura = [];
                    }
                }
            },
            error: (err) => {
                console.log('Error al eliminar el registro:', err);
            }
        });
    } else {
        console.log('El ID de la factura es nulo.');
    }
}

refreshTableData(): void {
    // Aquí vuelves a obtener los datos del presupuesto
    this.facturasService.getSaleData(this.saleId as number).subscribe({
        next: (data: any) => {
            // Actualizas los datos en la variable datosPresupuesto
            this.datosFactura = data;
        },
        error: (err) => {
            console.log('Error al actualizar los datos de la tabla:', err);
        }
    });
}

private getTableData(): any[] {
    // Verificar si hay datos del presupuesto
    if (!this.datosFactura || !this.datosFactura) {
      return [];
    }

    // Crear un arreglo para almacenar los datos de la tabla
    const tableData: any[] = [];

    // Iterar sobre los detalles del presupuesto
    this.datosFactura.forEach((item, index) => {
      const rowData: any[] = [];

      // Agregar los datos de cada columna
      rowData.push(index + 1); // Número de fila
      rowData.push(item.MaterialName); // Nombre del material
      rowData.push(item.ImageUrl); // URL de la imagen
      rowData.push(item.Quantity); // Cantidad
      rowData.push(item.ProviderName); // Nombre del proveedor
      rowData.push(item.UnitPrice); // ID del material

      // Agregar la fila al arreglo de datos de la tabla
      tableData.push(rowData);
    });

    return tableData;
  }

  exportToPDF(): void {
    const tableData: any[] = this.getTableData1(); // Asegúrate de que getTableData devuelve una matriz con la estructura adecuada
    this.exportService.exportToPDFFactura(tableData, 'factura');
  }

  private getTableData1(): any[] {
    // Crear una matriz para los datos de la tabla
    const tableData: any[] = [];

    // Verificar si hay datos
    if (this.datosFactura && this.datosFactura) {
      // Iterar sobre los datos y agregar cada fila a la matriz de datos de la tabla
      this.datosFactura.forEach((saleDetail, index) => {
        const rowData = [
          index + 1, // Número de fila
          saleDetail.MaterialName, // Nombre del producto
          saleDetail.ImageUrl, // URL de la imagen
          saleDetail.Quantity, // Cantidad
          saleDetail.ProviderName, // Nombre del proveedor
          saleDetail.UnitPrice // Precio
        ];
        tableData.push(rowData);
      });
    }

    return tableData;
  }

  exportToExcel(): void {
    const tableData = this.getTableData();
    this.exportService.exportToExcelFactura(tableData);
  }

  contador: number = 1;

    incrementarContador(): void {
    this.contador++;
}

recalcularTotal(datosEvento: any, item: SaleDataModelRaw)
    {
        this.subTotal = 0;
        this.iva  = 0;
        this.total  = 0;
        let cantidad: number  = parseInt(datosEvento.srcElement.value);
        if (this.datosFactura && this.datosFactura)
        {
            for (let index = 0; index < this.datosFactura.length; index++)
            {
                if (item.SaleDetailID === this.datosFactura[index].SaleDetailID)
                {
                    this.datosFactura[index].Quantity = cantidad;

                    this.facturasService.updateSaleDetail(
                        this.datosFactura[index].SaleDetailID,
                        this.datosFactura[index].SaleID,
                        this.datosFactura[index].MaterialID,
                        this.datosFactura[index].ProviderID,
                        this.datosFactura[index].Quantity).subscribe({
                            next: (data: any) => {
                                // Actualizas los datos en la variable datosPresupuesto
                                console.log(data);
                            },
                            error: (err) => {
                                console.log('Error al actualizar los datos de la tabla:', err);
                            }
                        });

                    break;
                }
            }
            this.calcularTotal(this.datosFactura);
        }
        // let unitPrice = item.stock.UnitPrice;
        // this.subTotal = cantidad * unitPrice;
        // this.iva = this.subTotal * 0.21;
        // this.total = this.subTotal + this.iva;
        // console.log(datosEvento.srcElement.value);

    }

    calcularTotal(items: SaleDataModelRaw[])
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

    setEnvio(envio: string)
    {
        this.envio = envio;
    }

    openConfirmModal() {
        const modalElement = document.getElementById('confirmModal');
        const modal = new bootstrap.Modal(modalElement!);
        modal.show();
    }

    confirmarCompra()
    {

        if (this.envio === 'direccion') {

        }

        let total = this.total;

        let datosFactura: SaleDataToUpdate =
        {
            SaleDate : new Date().toISOString().slice(0, 10),
            customers_CustomerID:   this.globalDataService.getUsuarioLogado()?.CustomerID!,
            address: this.envio === 'direccion' ? this.direccionEnvio : 'C/ Avenida Salamanca nº2, Valladolid, Valladolid',
            postalCode: this.envio === 'direccion' ? this.direccionEnvioCodigoPostal :47018,
            created_at: new Date().toISOString().slice(0, 10),
            updated_at: new Date().toISOString().slice(0, 10),
            total: total,
            SaleID: this.globalDataService.getIdFacturaActual()!

        };

        console.log("datosFactura",datosFactura);

        this.facturasService.updateSale(datosFactura).subscribe({
            next: (data: any) => {
                // Actualizas los datos en la variable datosPresupuesto
                console.log(data);
                const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal')!);
                confirmModal.hide();
                const modalElement = document.getElementById('successModal');
                const modal = new bootstrap.Modal(modalElement!);
                modal.show();

                this.router.navigate(['/dashboard/materialescliente']);

                setTimeout(() => {
                    window.location.reload(); // Recargar la página después de un breve retraso
                }, 1000);


            },
            error: (err) => {
                console.log('Error al actualizar los datos de la tabla:', err);
            }
        });;


    }



}

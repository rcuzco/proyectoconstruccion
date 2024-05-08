import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataModel } from 'src/app/models/budget-data-model';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.scss']
})
export class ListadoComponent
{
    budgetId: number | null = 0;
    datosPresupuesto: BudgetDataModel | null = null;
    constructor(private router: Router, private presupuestosService: PresupuestosService, private route: ActivatedRoute, private globalDataService: GlobalDataService, private exportService: ExportService)
    {

    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.budgetId = this.globalDataService.getIdPresupuestoActual();

            console.log("Received id:", this.budgetId);

            if (this.budgetId == null)
            {
                alert("no hay presupuesto creado de momento.");
            }

            this.presupuestosService.getBudgetData(this.budgetId as number).subscribe({
                next: (data: BudgetDataModel) =>
                {
                    console.log("presupuesto", data);
                    this.datosPresupuesto = data;
                },
                error: (err) =>
                {
                    console.log(err);
                },
                complete: () =>
                {
                    console.log("complete");
                }
            });


        });

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
}

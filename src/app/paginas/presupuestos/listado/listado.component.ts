import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataModel } from 'src/app/models/budget-data-model';
import { PresupuestosService } from 'src/app/services/presupuestos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  budgetId: number = 0;
  datosPresupuesto:BudgetDataModel | null = null;
  constructor(private router: Router, private presupuestosService: PresupuestosService, private route: ActivatedRoute){

  }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.budgetId = params['id'];

      console.log("Received id:", this.budgetId);

      this.presupuestosService.getBudgetData(this.budgetId).subscribe({
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
}

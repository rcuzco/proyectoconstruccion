import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialStock } from 'src/app/models/materialstock';
import { StockService } from 'src/app/services/stock.service';

@Component({
    selector: 'app-gestionar-stock-material',
    templateUrl: './gestionar-stock-material.component.html',
    styleUrls: ['./gestionar-stock-material.component.scss']
})
export class GestionarStockMaterialComponent implements OnInit
{
    materialId!: number;
    stocksByMaterial!: MaterialStock[];
    materialName!: string;


    constructor(private formBuilder: FormBuilder, private stockService: StockService, private router: Router, private route: ActivatedRoute)
    {

    }
    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.materialId = params['id'];
            this.materialName = params['materialName'];

            // Now you can use the 'id' in your component logic
            console.log('Received id:', this.materialId);



            this.stockService.getStockByMaterial(this.materialId).subscribe({
                next: (data: MaterialStock[]) =>
                {
                    this.stocksByMaterial = data;
                },
                error: (err) =>
                {
                    console.log(err);
                },
                complete: () =>
                {
                    console.log("complete");
                }
            })
        });
    }

    goToAddStock()
    {
        //redirect to add stock
        this.router.navigate(['/dashboard/materiales/stocks/nuevo', this.materialId, this.materialName]);
    }

    goToEditStock(stockId: number)
    {
        this.router.navigate(['/dashboard/materiales/stocks/editar', stockId]);
    }
}

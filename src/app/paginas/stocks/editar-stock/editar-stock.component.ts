import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialStock } from 'src/app/models/materialstock';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
    selector: 'app-editar-stock',
    templateUrl: './editar-stock.component.html',
    styleUrls: ['./editar-stock.component.scss']
})
export class EditarStockComponent implements OnInit
{
    materialName!: string;
    updateStockForm = this.formBuilder.group({
        stockId: [0, [Validators.required]],
        providerName: [''],
        quantity: [0, [Validators.required]],
        unitPrice: [0, [Validators.required]],
    });
    stockId!: number;
    materialId!: number;

    constructor(private formBuilder: FormBuilder, private router: Router, private stockService: StockService, private route: ActivatedRoute)
    {

    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.stockId = params['stockId'];

            this.stockService.getStockById(this.stockId).subscribe({
                next: (data: MaterialStock) =>
                {
                    console.log("datos del stock", data);
                    this.updateStockForm.controls['stockId'].setValue(data.StockId);
                    this.updateStockForm.controls['providerName'].setValue(data.ProviderName);
                    this.updateStockForm.controls['quantity'].setValue(data.Quantity);
                    this.updateStockForm.controls['unitPrice'].setValue(data.UnitPrice);
                    this.materialName = data.MaterialName;
                    this.materialId = data.MaterialID;
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

    goBackToStocks()
    {
        console.log(this.materialId, this.materialName);
        this.router.navigate(["dashboard/materiales/stocks/gestionar", this.materialId, this.materialName]);
    }

    updateStock()
    {
        let stock: Stock = {
            StockId: this.stockId,
            ProviderId: 0, //dejamos este valor a cero porque NO se actualizará
            Quantity: this.updateStockForm.value.quantity!,
            UnitPrice: this.updateStockForm.value.unitPrice!,
            MaterialId: 0 //dejamos este valor a cero porque NO se actualizará
        };


        this.stockService.updateStock(stock).subscribe({
            next: (data) =>
            {
                console.log("actualizado con éxito");
                this.goBackToStocks();
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


    }
}

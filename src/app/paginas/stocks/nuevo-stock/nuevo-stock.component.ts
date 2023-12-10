import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { Stock } from 'src/app/models/stock';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
    selector: 'app-nuevo-stock',
    templateUrl: './nuevo-stock.component.html',
    styleUrls: ['./nuevo-stock.component.scss']
})
export class NuevoStockComponent implements OnInit
{
    newStockForm = this.formBuilder.group({
        materialId: [0, [Validators.required]],
        providerId: [null, [Validators.required]],
        quantity: [0, [Validators.required]],
        unitPrice: [0, [Validators.required]],
    });
    materialName!: string;
    materialId!: number;
    providers!: Proveedor[] | undefined;

    constructor(private formBuilder: FormBuilder, private router: Router, private stockService: StockService, private route: ActivatedRoute, private providerService: ProveedoresService, private materialService: MaterialesService)
    {
    }
    ngOnInit(): void
    {
        this.getProviders();
        this.route.params.subscribe(params =>
        {
            this.materialId = params['materialId'];
            this.materialName = params['materialName'];
        });

    }

    addNewStock()
    {
        console.log("datos del formulario", this.newStockForm);
        //create stock object
        const stock: Stock = {
            MaterialId: this.materialId,
            ProviderId: this.newStockForm.get("providerId")?.value!,
            Quantity: this.newStockForm.get("quantity")?.value!,
            UnitPrice: this.newStockForm.get("unitPrice")?.value!,
            StockId: 0
        };


        console.log("stock a guardar", stock);


        this.stockService.addStock(stock).subscribe({
            next: (data) =>
            {
                this.router.navigate(['/dashboard/materiales/stocks/gestionar', this.materialId, this.materialName]);
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

    async getProviders()
    {
        let allproviders = await this.providerService.getData().toPromise()!;
        let materialStockData = await this.stockService.getStockByMaterial(this.materialId).toPromise();

        //remove providers found in materialStockData
        this.providers = allproviders?.filter(provider =>
        {
            return !materialStockData?.some(material => material.ProviderId === provider.ProviderID);
        });

    }

    goBackToStocks()
    {
        this.router.navigate(["dashboard/materiales/stocks/gestionar", this.materialId, this.materialName]);
    }

}

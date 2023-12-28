import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { MaterialStock } from 'src/app/models/materialstock';
import { Material } from 'src/app/models/material';
import { Router } from '@angular/router';



@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit
{

    constructor(private route: ActivatedRoute, private materialesService: MaterialesService, private router: Router) { }

    materialId: number = 0;
    material!: Material;
    load: boolean = false;
    mat2: MaterialStock = {} as MaterialStock;

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.materialId = params['id'];

            console.log('Received id:', this.materialId);

            this.materialesService
                .getDataById(this.materialId)
                .subscribe(data =>
                {
                    if (data)
                    {
                        this.material = data;
                        console.log(this.material);
                        this.load = true;
                    } else
                    {
                        console.log("No se encontró el material");
                    }

                });
        });
    }

    deleteMaterial()
    {
        this.materialesService.deleteMaterial(this.materialId)
            .subscribe(data =>
            {
                if (data)
                {
                    console.log("Material eliminado");
                    this.router.navigate(['/dashboard/materiales']);
                } else
                {
                    console.log("No se pudo eliminar el material");
                }
            });
    }

    handleImageError(material: Material)
    {
        console.log("Error al cargar la imagen");
        material.ShowGenericImage = true;
    }
}

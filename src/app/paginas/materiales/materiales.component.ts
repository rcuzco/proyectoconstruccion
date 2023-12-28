import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialStock } from 'src/app/models/materialstock';
import { User } from 'src/app/models/user';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
    selector: 'app-materiales',
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit
{
    public materiales: MaterialStock[] = [];
    public usuarioLogado!: User|undefined|null;

    constructor(private materialesService: MaterialesService, private router: Router, private globalDataService: GlobalDataService) { }

    ngOnInit(): void
    {
      this.usuarioLogado = this.globalDataService.getUsuarioLogado();
console.log(this.usuarioLogado);
        console.log("Cargando materiales");
        this.materialesService.getData().subscribe(data =>
        {
          console.log("materiales", data);
            this.materiales = data;
        })
    }

    isPopupVisible = false;
    imageUrl: string = '';

    showImagePopup(imageUrl: string)
    {
        this.isPopupVisible = true;
        this.imageUrl = imageUrl;
    }

    hideImagePopup()
    {
        this.isPopupVisible = false;
    }

    goToDetails(materialId: number)
    {
        this.router.navigate(["dashboard/materiales", materialId]);
    }

    goToEdit(materialId: number)
    {
        this.router.navigate(["dashboard/materiales/material/editar", materialId]);
    }

    handleImageError(material: MaterialStock)
    {
        console.log("Error al cargar la imagen");
        material.ShowGenericImage = true;
    }

    manageStock(materialId: number, materialName: string)
    {
      console.log("materialId",materialId);
      console.log("materialName",materialName);
        this.router.navigate(["dashboard/materiales/stocks/gestionar", materialId, materialName]);
    }
}

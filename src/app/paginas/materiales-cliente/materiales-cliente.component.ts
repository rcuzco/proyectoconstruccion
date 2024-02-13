import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialStock } from 'src/app/models/materialstock';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { MaterialesClienteService } from 'src/app/services/materiales-cliente.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';


@Component({
  selector: 'app-materiales-cliente',
  templateUrl: './materiales-cliente.component.html',
  styleUrls: ['./materiales-cliente.component.scss']
})
export class MaterialesClienteComponent implements OnInit {


  public materiales: MaterialStock[] = [];


  constructor (private materialesService: MaterialesClienteService, private router: Router, private presupuestoService: PresupuestosService, private globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.materialesService.getData().subscribe(data =>
    {
      console.log("materiales", data);
        this.materiales = data;
    })
  }

  goToDetails(materialId: number) {
    this.router.navigate(["dashboard/materiales", materialId]);
  }

  addToWhishlist(materialId: number, providerId: number)
  {
    const customerId = this.globalDataService.getUsuarioLogado()?.UserId;
    let material:MaterialStock|undefined = this.materiales.find(m=>m.MaterialID === materialId && m.ProviderId === providerId);
    //material?.Quantity = 1;
    this.presupuestoService.add(material, customerId).subscribe(data =>
      {
        console.log("material agregado al presupuesto", data);
      });
  }

  handleImageError(material: MaterialStock) {
    console.log("Error al cargar la imagen");
    material.ShowGenericImage = true;
  }

}

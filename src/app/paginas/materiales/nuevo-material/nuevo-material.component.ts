import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Material } from 'src/app/models/material'

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.scss']
})
export class NuevoMaterialComponent {

insertForm = this.formBuilder.group({
  materialName:["", [Validators.required]],
  materialDescription:["", [Validators.required]],
  imageUrl:["", [Validators.required]],
});


constructor(private formBuilder: FormBuilder, private router: Router, private materialesService: MaterialesService)
{

}

insertarMaterial() {
  if (this.insertForm.valid) {
    let nuevoMaterial: Material = {
      MaterialName : this.insertForm.value.materialName!,
      Description : this.insertForm.value.materialDescription!,
      ImageUrl : this.insertForm.value.imageUrl!,
      MaterialId : 0,
      ProviderName:'',
      Quantity:0,
      UnitPrice:0

    };

    this.materialesService.insertMaterial(nuevoMaterial).subscribe(
      (data:number)=>
      {
        console.log(data);
      }
    );

  }
  }
}

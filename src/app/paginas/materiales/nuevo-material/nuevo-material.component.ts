import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { MaterialStock } from 'src/app/models/materialstock'

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
  materialImageFile: [null, [Validators.required]],
});
selectedFile!: File;
status!: boolean;
imageSrc!: string | ArrayBuffer | null;

constructor(private formBuilder: FormBuilder, private router: Router, private materialesService: MaterialesService)
{

}

insertarMaterial() {
  if (this.insertForm.valid) {
    let nuevoMaterial: MaterialStock = {
      MaterialName : this.insertForm.value.materialName!,
      Description : this.insertForm.value.materialDescription!,
      ImageUrl : this.insertForm.value.imageUrl!,
      MaterialID : 0,
      ProviderName:'',
      ProviderId:0,
      Quantity:0,
      UnitPrice:0,
      StockId:0,
    ShowGenericImage:true

    };

    this.materialesService.insertMaterial(nuevoMaterial).subscribe(
      (data:number)=>
      {
        console.log(data);
        if ((window as {[key: string]: any})['successmaterial_noti']) {
          (window as {[key: string]: any})['successmaterial_noti']();
        } else {
          console.error('La función success_noti no está definida en el ámbito global.');
        }
        this.router.navigate(["dashboard/materiales"]);
      }
    );

  }
  }
  handleFileInput(event: any)
    {
        const file = event.target.files[0];
        this.status = event.target.files.length > 0 ? true : false
        if (this.status == true)
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>
            {
                this.imageSrc = reader.result;
            }
            this.insertForm.controls['imageUrl'].setValue(file.name);
        }
    }
}

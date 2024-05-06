import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from 'src/app/models/material';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-editar-material',
  templateUrl: './editar-material.component.html',
  styleUrls: ['./editar-material.component.scss']
})
export class EditarMaterialComponent implements OnInit
{

  materialId!: number;
  material!: Material;

  editForm = this.formBuilder.group({
    materialName: ["", [Validators.required]],
    materialDescription: ["", [Validators.required]],
    category: ["", [Validators.required]],
    imageUrl: ["", [Validators.required]],
    imageFile: [null, [Validators.required]],
  });
  selectedFile!: File;
  status!: boolean;
  imageSrc!: any;




  constructor(private formBuilder: FormBuilder, private router: Router, private materialesService: MaterialesService, private route: ActivatedRoute)
  {

  }
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

            this.editForm.controls['materialName'].setValue(this.material.MaterialName);
            this.editForm.controls['materialDescription'].setValue(this.material.Description);
            this.editForm.controls['imageUrl'].setValue(this.material.ImageUrl);
            this.editForm.controls['category'].setValue(this.material.Category);

          } else
          {
            console.log("No se encontró el material");
          }

        });
    });
  }

  updateMaterial(): void
  {

    let material: Material = {
      MaterialId: this.materialId,
      MaterialName: this.editForm.value.materialName!,
      Description: this.editForm.value.materialDescription!,
      ImageUrl: this.editForm.value.imageUrl!,
      ImageFile: this.imageSrc,
      ShowGenericImage: true,
      Category: this.editForm.value.category!,
    }

    console.log("material a actualizar", material);

    this.materialesService.updateMaterial(material).subscribe(
      {
        next: (data) =>
        {
          console.log(data);
        },
        error: (error) =>
        {
          console.log(error);
        },
        complete: () =>
        {
          console.log("Material actualizado");
          this.router.navigate(['/dashboard/materiales']);
          if ((window as {[key: string]: any})['successmaterialedit_noti']) {
            (window as {[key: string]: any})['successmaterialedit_noti']();
          } else {
            console.error('La función success_noti no está definida en el ámbito global.');
          }
        }
      }
    );
  }

  handleFileInput(event: any)
  {
    const file = event.target.files[0];
    this.status = event.target.files.length > 0 ? true : false
    if (this.status == true)
    {
      this.imageSrc = file;
      this.editForm.controls['imageUrl'].setValue(file.name);
    }
  }

  goBackToMaterials()
  {
    this.router.navigate(['/dashboard/materiales']);
  }
}

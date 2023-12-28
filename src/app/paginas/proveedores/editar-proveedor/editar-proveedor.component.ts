import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.scss']
})
export class EditarProveedorComponent implements OnInit
{

  providerId!: number;
  proveedor!: Proveedor;

  updateProviderForm = this.formBuilder.group({

    providerName: ["", [Validators.required]],
    contactName: ["", [Validators.required]],
    contactEmail: ["", [Validators.required]],
    contactPhone: ["", [Validators.required]],
  });


  constructor(private formBuilder: FormBuilder, private router: Router, private proveedoresService: ProveedoresService, private route: ActivatedRoute){

  }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.providerId = params['id'];

      console.log("Received id:", this.providerId);

      this.proveedoresService
        .getDataById(this.providerId)
        .subscribe(data =>
          {
            if (data)
            {
              this.proveedor = data;
              console.log(this.proveedor);

              this.updateProviderForm.controls['providerName'].setValue(this.proveedor.ProviderName);
              this.updateProviderForm.controls['contactName'].setValue(this.proveedor.ContactName);
              this.updateProviderForm.controls['contactEmail'].setValue(this.proveedor.ContactEmail);
              this.updateProviderForm.controls['contactPhone'].setValue(this.proveedor.ContactPhone);

            } else
            {
              console.log("No se encontró el proveedor");
            }

          });

    });

  }

  updateProvider(): void
  {
    let proveedor: Proveedor = {
      ProviderID: this.providerId,
      ProviderName: this.updateProviderForm.value.providerName!,
      ContactName: this.updateProviderForm.value.contactName!,
      ContactEmail: this.updateProviderForm.value.contactEmail!,
      ContactPhone: this.updateProviderForm.value.contactPhone!,
    }

    console.log("proveedor a actualizar", proveedor);

    this.proveedoresService.updateProveedor(proveedor).subscribe(
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
          console.log("Proveedoredor actualizado");
          this.router.navigate(['/dashboard/proveedores']);
        }
      }
    );
    }

    goBackToProviders(){

      this.router.navigate(['/dashboard/proveedores']);
    }
  }


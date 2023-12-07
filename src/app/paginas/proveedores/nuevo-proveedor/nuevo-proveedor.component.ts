import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedor } from 'src/app/models/proveedor'

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.scss']
})
export class NuevoProveedorComponent {

  insertForm = this.formBuilder.group({
    ProviderName:["", [Validators.required]],
    ContactName:["", [Validators.required]],
    ContactEmail: ["", [Validators.required]],
    ContactPhone: ["", [Validators.required]],
  });


constructor(private formBuilder: FormBuilder, private router: Router, private proveedoresService: ProveedoresService)
{

}

insertarProveedor() {
  if (this.insertForm.valid) {
    let nuevoProveedor: Proveedor = {
      ProviderName : this.insertForm.value.ProviderName!,
      ContactName : this.insertForm.value.ContactName!,
      ContactEmail : this.insertForm.value.ContactEmail!,
      ContactPhone: this.insertForm.value.ContactPhone!,
      ProviderId : 0,

    };

    this.proveedoresService.insertProveedor(nuevoProveedor).subscribe(
      (data:number)=>
      {
        console.log(data);
      }
    );

  }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss']
})
export class CrearUsuariosComponent {

  insertForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    contactEmail: ["", [Validators.required]],
    password: ["", [Validators.required]],
    contactName: ["", [Validators.required]],
    contactPhone: ["", [Validators.required]],
    customerName: ["", [Validators.required]],
    userType: ["", [Validators.required]],


  });

  constructor(private formBuilder: FormBuilder, private router: Router, private clientesService: ClientesService)
 {
 }

  insertarUsuario() {
    if (this.insertForm.valid) {



      let nuevoUsuario: Cliente = {
        UserName : this.insertForm.value.username!,
        ContactEmail : this.insertForm.value.contactEmail!,
        Password : this.insertForm.value.password!,
        ContactName : this.insertForm.value.contactName!,
        ContactPhone: this.insertForm.value.contactPhone!,
        CustomerName: this.insertForm.value.customerName!,
        UserType: this.insertForm.value.userType!,
        CustomerID : 0,
      };

      

    this.clientesService.insertUser(nuevoUsuario).subscribe(
      (data:number)=>
      {
        console.log(data);
      }

    );




}
}

}

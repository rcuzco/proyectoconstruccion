import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  public clientes: Cliente[] = [];

  insertForm = this.formBuilder.group({
    userName:["", [Validators.required]],
    password:["", [Validators.required]],
    userType:["", [Validators.required]],
    customerName:["", [Validators.required]],
    contactName:["", [Validators.required]],
    contactEmail:["", [Validators.required]],
    contactPhone:["", [Validators.required]],
  });

  constructor(private clientesService: ClientesService, private formBuilder: FormBuilder, private router: Router) { }

  insertarUsuario() {
    if (this.insertForm.valid) {
      let nuevoCliente: Cliente = {
        UserName : this.insertForm.value.userName!,
        Password : this.insertForm.value.password!,
        UserType : "Cliente",
        CustomerID: 0,
        CustomerName: this.insertForm.value.customerName!,
        ContactName: this.insertForm.value.contactName!,
        ContactEmail: this.insertForm.value.contactEmail!,
        ContactPhone: this.insertForm.value.contactPhone!,
      };

      this.clientesService.insertUser(nuevoCliente).subscribe(
        (data:number)=>
        {
          console.log(data);
        }
      );
      }
    }

    irAlLogin() {
      this.router.navigate(['/login']);
    }

}

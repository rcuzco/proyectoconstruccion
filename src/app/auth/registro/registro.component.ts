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
    userType:["Cliente", [Validators.required]],
    customerName:["", [Validators.required]],
    contactName:["", [Validators.required]],
    contactEmail:["", [Validators.required]],
    contactPhone:["", [Validators.required]],
  });

  constructor(private clientesService: ClientesService, private formBuilder: FormBuilder, private router: Router) { }

  insertarUsuario() {
    if (this.insertForm.valid) {



      let nuevoUsuario: Cliente = {
        UserName : this.insertForm.value.userName!,
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
        if ((window as {[key: string]: any})['successuser_noti']) {
            (window as {[key: string]: any})['successuser_noti']();
          } else {
            console.error('La función success_noti no está definida en el ámbito global.');
          }
      }

    );

    this.irAlLogin();






}
}

    irAlLogin() {
      this.router.navigate(['/login']);
    }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{

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

  constructor(private clientesService: ClientesService,private exportService: ExportService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      console.log("Cargando clientes");
      this.clientesService.getData().subscribe(data => {
        this.clientes = data;
      })
  }

  insertarUsuario() {
    if (this.insertForm.valid) {
      let nuevoCliente: Cliente = {
        UserName : this.insertForm.value.userName!,
        Password : this.insertForm.value.password!,
        UserType : this.insertForm.value.userType!,
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

    exportToExcelClientes(): void {
        this.exportService.exportToExcelClientes(this.clientes, 'clientes');
      }

      exportToPDFClientes(): void {
        this.exportService.exportToPDFClientes(this.clientes, 'clientes');
      }
  }


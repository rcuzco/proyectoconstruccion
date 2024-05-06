import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];

  constructor(private clientesService: ClientesService, private exportService: ExportService) { }

  ngOnInit(): void {
    console.log("Cargando clientes");
    this.clientesService.getData().subscribe(data => {
      this.clientes = data;
    })
  }

  exportToExcelClientes(): void {
    this.exportService.exportToExcelClientes(this.clientes, 'clientes');
  }

  exportToPDFClientes(): void {
    this.exportService.exportToPDFClientes(this.clientes, 'clientes');
  }

}

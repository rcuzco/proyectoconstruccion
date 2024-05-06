import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/services/export.service'; 

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public proveedores: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private exportService: ExportService // Inyecta el servicio de exportación
  ) { }

  ngOnInit(): void {
    console.log("Cargando proveedores", this.proveedores);
    this.proveedoresService.getData().subscribe(data => {
      this.proveedores = data;
    })
  }

  goToEdit(proveedorId: number) {
    this.router.navigate(["dashboard/proveedores/editarproveedor", proveedorId]);
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.proveedores, 'proveedores');
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.proveedores, 'proveedores');
  }
}

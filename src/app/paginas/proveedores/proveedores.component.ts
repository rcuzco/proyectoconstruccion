import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public proveedores: Proveedor[] = [];

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    console.log("Cargando proveedores");
    this.proveedoresService.getData().subscribe(data => {
      this.proveedores = data;
    })
  }

}

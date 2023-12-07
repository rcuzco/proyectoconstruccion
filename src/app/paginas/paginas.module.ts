import { NgModule } from "@angular/core";
import { MaterialesComponent } from "./materiales/materiales.component";
import { PaginasComponent } from "./paginas.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MaterialComponent } from './materiales/material/material.component';
import { NuevoMaterialComponent } from './materiales/nuevo-material/nuevo-material.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';

@NgModule({
  declarations: [
    MaterialesComponent,
    PaginasComponent,
    DashboardComponent,
    ProveedoresComponent,
    ClientesComponent,
    MaterialComponent,
    NuevoMaterialComponent,
    NuevoProveedorComponent
  ],
  exports: [
    MaterialesComponent,
    ProveedoresComponent,
    ClientesComponent,
    PaginasComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class PaginasModule { }

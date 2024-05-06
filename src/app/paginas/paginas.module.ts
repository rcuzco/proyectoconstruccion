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
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarMaterialComponent } from './materiales/editar-material/editar-material.component';
import { GestionarStockMaterialComponent } from './stocks/gestionar-stock-material/gestionar-stock-material.component';
import { NuevoStockComponent } from './stocks/nuevo-stock/nuevo-stock.component';
import { EditarStockComponent } from './stocks/editar-stock/editar-stock.component';
import { EditarProveedorComponent } from './proveedores/editar-proveedor/editar-proveedor.component';
import { MaterialesClienteComponent } from './materiales-cliente/materiales-cliente.component';
import { ListadoComponent } from './presupuestos/listado/listado.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { PortadaComponent } from './portada/portada.component';
import { MaterialesConstruccionComponent } from './materiales-construccion/materiales-construccion.component';
import { MaderaComponent } from './madera/madera.component';
import { PuertasVentanasComponent } from './puertas-ventanas/puertas-ventanas.component';
import { SuelosRevestimientosComponent } from './suelos-revestimientos/suelos-revestimientos.component';
import { CocinasComponent } from './cocinas/cocinas.component';
import { BanosComponent } from './banos/banos.component';
import { CeramicaComponent } from './ceramica/ceramica.component';
import { FontaneriaComponent } from './fontaneria/fontaneria.component';
import { ClimatizacionCalefaccionComponent } from './climatizacion-calefaccion/climatizacion-calefaccion.component';
import { ElectricidadComponent } from './electricidad/electricidad.component';
import { EnergiaRenovableComponent } from './energia-renovable/energia-renovable.component';
import { IluminacionComponent } from './iluminacion/iluminacion.component';
import { HerramientasComponent } from './herramientas/herramientas.component';
import { FerreteriaComponent } from './ferreteria/ferreteria.component';
import { PinturaComponent } from './pintura/pintura.component';

@NgModule({
  declarations: [
    MaterialesComponent,
    PaginasComponent,
    DashboardComponent,
    ProveedoresComponent,
    ClientesComponent,
    MaterialComponent,
    NuevoMaterialComponent,
    NuevoProveedorComponent,
    PedidosComponent,
    UsuariosComponent,
    EditarMaterialComponent,
    GestionarStockMaterialComponent,
    NuevoStockComponent,
    EditarStockComponent,
    EditarProveedorComponent,
    MaterialesClienteComponent,
    ListadoComponent,
    CrearUsuariosComponent,
    PerfilClienteComponent,
    PortadaComponent,
    MaterialesConstruccionComponent,
    MaderaComponent,
    PuertasVentanasComponent,
    SuelosRevestimientosComponent,
    CocinasComponent,
    BanosComponent,
    CeramicaComponent,
    FontaneriaComponent,
    ClimatizacionCalefaccionComponent,
    ElectricidadComponent,
    EnergiaRenovableComponent,
    IluminacionComponent,
    HerramientasComponent,
    FerreteriaComponent,
    PinturaComponent
  ],
  exports: [
    MaterialesComponent,
    ProveedoresComponent,
    ClientesComponent,
    PaginasComponent,
    DashboardComponent,
    RouterModule,
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

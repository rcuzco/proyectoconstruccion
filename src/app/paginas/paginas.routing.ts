
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginasComponent } from './paginas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MaterialComponent } from './materiales/material/material.component';
import { NuevoMaterialComponent } from './materiales/nuevo-material/nuevo-material.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarMaterialComponent } from './materiales/editar-material/editar-material.component';
import { GestionarStockMaterialComponent } from './stocks/gestionar-stock-material/gestionar-stock-material.component';
import { NuevoStockComponent } from './stocks/nuevo-stock/nuevo-stock.component';
import { EditarStockComponent } from './stocks/editar-stock/editar-stock.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PaginasComponent,
    children: [
        { path: '', component: DashboardComponent },
        { path: 'materiales', component: MaterialesComponent },
        { path: 'materiales/:id', component: MaterialComponent },
        { path: 'materiales/material/nuevo', component: NuevoMaterialComponent },
        { path: 'materiales/material/editar/:id', component: EditarMaterialComponent },
        { path: 'materiales/stocks/gestionar/:id/:materialName', component: GestionarStockMaterialComponent },
        { path: 'materiales/stocks/nuevo/:materialId/:materialName', component: NuevoStockComponent },
        { path: 'materiales/stocks/editar/:stockId', component: EditarStockComponent },
        { path: 'proveedores/nuevoproveedor', component: NuevoProveedorComponent },
        { path: 'proveedores', component: ProveedoresComponent },
        { path: 'clientes', component: ClientesComponent },
        { path: 'usuarios', component: UsuariosComponent },
    ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }

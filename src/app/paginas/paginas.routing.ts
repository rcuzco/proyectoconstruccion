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
import { EditarProveedorComponent } from './proveedores/editar-proveedor/editar-proveedor.component';
import { MaterialesClienteComponent } from './materiales-cliente/materiales-cliente.component';
import { ListadoComponent } from './presupuestos/listado/listado.component';
import { ListadoFacturaComponent } from './facturas/listadoFactura/listadoFactura.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { PortadaComponent } from './portada/portada.component';
import { MaderaComponent } from './madera/madera.component';
import { MaterialesConstruccionComponent } from './materiales-construccion/materiales-construccion.component';
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
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosClienteComponent} from './pedidos-cliente/pedidos-cliente.component';


const routes: Routes = [

  { path: 'portada', component: PortadaComponent },

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
        { path: 'proveedores/editarproveedor/:id', component: EditarProveedorComponent },
        { path: 'clientes/crearUsuario', component: CrearUsuariosComponent },
        { path: 'materialescliente', component: MaterialesClienteComponent },
        { path: 'presupuestos', component: ListadoComponent },
        { path: 'facturas', component: ListadoFacturaComponent },
        { path: 'perfil', component: PerfilClienteComponent },
        { path: 'madera', component: MaderaComponent },
        { path: 'materialesconstruccion', component: MaterialesConstruccionComponent },
        { path: 'puertasventanas', component: PuertasVentanasComponent },
        { path: 'suelosrevestimientos', component: SuelosRevestimientosComponent },
        { path: 'cocinas', component: CocinasComponent },
        { path: 'banos', component: BanosComponent },
        { path: 'ceramica', component: CeramicaComponent },
        { path: 'fontaneria', component: FontaneriaComponent },
        { path: 'climatizacioncalefaccion', component: ClimatizacionCalefaccionComponent },
        { path: 'electricidad', component: ElectricidadComponent },
        { path: 'energiarenovable', component: EnergiaRenovableComponent },
        { path: 'iluminacion', component: IluminacionComponent },
        { path: 'herramientas', component: HerramientasComponent },
        { path: 'ferreteria', component: FerreteriaComponent },
        { path: 'pintura', component: PinturaComponent },
        { path: 'pedidos', component: PedidosComponent},
        { path: 'pedidoscliente', component: PedidosClienteComponent}
    ]


},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaginasRoutingModule { }

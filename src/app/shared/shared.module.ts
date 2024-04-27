import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderClienteComponent } from './header-cliente/header-cliente.component';
import { SidebarClienteComponent } from './sidebar-cliente/sidebar-cliente.component';
import { NotificacionProveedorComponent } from './notificacion-proveedor/notificacion-proveedor.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HeaderClienteComponent,
    SidebarClienteComponent,
    NotificacionProveedorComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SidebarClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }

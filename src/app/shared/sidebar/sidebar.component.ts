import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public usuarioLogado!: Cliente|undefined|null;

  constructor(public globalDataService: GlobalDataService, public router: Router) { }

  ngOnInit(): void {
    //Muestra el usuario actual
    this.usuarioLogado = this.globalDataService.getUsuarioLogado();
    //Muestra el tipo de usuario
    console.log(this.usuarioLogado?.UserType);
  }

  logout()
  {
    this.globalDataService.clearUsuarioLogado();
    this.globalDataService.clearPresupuestoActual();
    //go to portada route
    this.router.navigate(['/portada']);
  }

}

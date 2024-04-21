import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {

  public usuarioLogado!: Cliente|undefined|null;

  constructor(public globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.globalDataService.getUsuarioLogado();

    console.log(this.usuarioLogado);
  }
}

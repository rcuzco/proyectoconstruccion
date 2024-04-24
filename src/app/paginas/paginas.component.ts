import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {


  public usuarioLogado!: Cliente|undefined|null;

    constructor( private router: Router, private globalDataService: GlobalDataService) { }

    ngOnInit(): void
    {
      this.usuarioLogado = this.globalDataService.getUsuarioLogado();
      console.log(this.usuarioLogado);
    }

}

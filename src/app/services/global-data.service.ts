import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private usuarioLogado!:Cliente | undefined|null ;

  constructor() { }

  setUsuarioLogado(cliente:Cliente){
    this.usuarioLogado = cliente;
  //save to local storage
    localStorage.setItem('usuarioLogado', JSON.stringify(cliente));

  }
  getUsuarioLogado():Cliente|undefined|null{
    //read from local storage, if empty then return null
    const storedUser = localStorage.getItem('usuarioLogado');
    //console.log("storedUser",storedUser);
    if (storedUser) {
        return JSON.parse(storedUser);
    } else {
        return null;
    }


  }
}

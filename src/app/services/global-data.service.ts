import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private usuarioLogado!:User | undefined|null ;

  constructor() { }

  setUsuarioLogado(user:User){
    this.usuarioLogado = user;
  //save to local storage
    localStorage.setItem('usuarioLogado', JSON.stringify(user));

  }
  getUsuarioLogado():User|undefined|null{
    //read from local storage, if empty then return null
    const storedUser = localStorage.getItem('usuarioLogado');
    if (storedUser) {
        return JSON.parse(storedUser);
    } else {
        return null;
    }


  }
}

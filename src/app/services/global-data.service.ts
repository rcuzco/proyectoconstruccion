import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
    providedIn: 'root'
})
export class GlobalDataService
{

    private usuarioLogado!: Cliente | undefined | null;

    constructor() { }

    setUsuarioLogado(cliente: Cliente)
    {
        this.usuarioLogado = cliente;
        //save to local storage
        localStorage.setItem('usuarioLogado', JSON.stringify(cliente));
    }

    clearUsuarioLogado()
    {
        this.usuarioLogado = undefined;
        //save to local storage
        localStorage.removeItem('usuarioLogado');
    }


    getUsuarioLogado(): Cliente | undefined | null
    {
        //read from local storage, if empty then return null
        const storedUser = localStorage.getItem('usuarioLogado');
        //console.log("storedUser",storedUser);
        if (storedUser)
        {
            return JSON.parse(storedUser);
        } else
        {
            return null;
        }
    }

    getIdPresupuestoActual(): number | null
    {
        //read from local storage, if empty then return null
        const budgetId = localStorage.getItem('budgetId');

        if (budgetId)
        {
            return parseInt(budgetId);
        } else
        {
            return null;
        }
    }

    getIdFacturaActual(): number | null
    {
        //read from local storage, if empty then return null
        const saleId = localStorage.getItem('saleId');

        if (saleId)
        {
            return parseInt(saleId);
        } else
        {
            return null;
        }
    }

    clearPresupuestoActual()
    {
        localStorage.removeItem('budgetId');
    }

    clearFacturaActual()
    {
        localStorage.removeItem('saleId');
    }
}

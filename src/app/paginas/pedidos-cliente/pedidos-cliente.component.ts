import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.scss']
})
export class PedidosClienteComponent implements OnInit {
  pedidos: any[] = [];
  usuarioActual: any;

  constructor(private facturasService: FacturasService, private globalDataServices: GlobalDataService) { }

  ngOnInit(): void {
    // Obtener el usuario actual
    this.usuarioActual = this.globalDataServices.getUsuarioLogado()?.CustomerID;

    console.log('Usuario actual:', this.usuarioActual);

    // Verificar si el usuario actual existe y tiene un ID
    if (this.usuarioActual) {
      // Obtener los pedidos del usuario actual
      this.facturasService.getDataAll().subscribe((data: any) => {
        console.log('Datos de pedidos:', data);
        // Filtrar los pedidos para mostrar solo aquellos que tienen el mismo ID que el usuario actual
        this.pedidos = data.filter((pedido: any) => pedido.customers_CustomerID === this.usuarioActual);
        console.log('Pedidos del usuario actual:', this.pedidos);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {
    this.facturasService.getDataAll().subscribe((data: any) => {
      this.pedidos = data;
    });
  }
}

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  exportToPDF(data: any[], fileName: string): void {
    const doc = new jsPDF();
    doc.text('Proveedores', 10, 10);
    // Utiliza autoTable para generar la tabla automáticamente
    (doc as any).autoTable({
      startY: 20,
      head: [['Nombre', 'Contacto', 'Email', 'Teléfono']],
      body: data.map(proveedor => [proveedor.ProviderName, proveedor.ContactName, proveedor.ContactEmail, proveedor.ContactPhone])
    });
    doc.save(fileName + '.pdf');
  }

  exportToExcelMateriales(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  exportToPDFMateriales(data: any[], fileName: string): void {
    const doc = new jsPDF();
    doc.text('Materiales', 10, 10);
    // Utiliza autoTable para generar la tabla automáticamente
    (doc as any).autoTable({
      startY: 20,
      head: [['ID', 'Nombre', 'Descripción']],
      body: data.map(material => [material.MaterialID,material.MaterialName, material.Description])
    });
    doc.save(fileName + '.pdf');
  }

  exportToExcelClientes(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  exportToPDFClientes(data: any[], fileName: string): void {
    const doc = new jsPDF();
    doc.text('Clientes', 10, 10);
    // Utiliza autoTable para generar la tabla automáticamente
    (doc as any).autoTable({
      startY: 20,
      head: [['ID', 'Nombre Cliente', 'Nombre Contacto', 'Email', 'Teléfono', 'Nombre Usuario', 'Tipo Usuario']],
      body: data.map(cliente => [cliente.CustomerID, cliente.CustomerName, cliente.ContactName, cliente.ContactEmail, cliente.ContactPhone, cliente.UserName, cliente.UserType])
    });
    doc.save(fileName + '.pdf');
  }

  exportToPDFPresupuesto(data: any[], fileName: string): void {
    const doc = new jsPDF();
    doc.text('Presupuesto', 10, 10);
    // Utiliza autoTable para generar la tabla automáticamente
    (doc as any).autoTable({
      startY: 20,
      head: [['#', 'Nombre Producto', 'Imagen', 'Cantidad', 'Proveedor', 'Precio']],
      body: data
    });
    doc.save(fileName + '.pdf');
  }

  exportToExcelPresupuesto(data: any[]): void {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Presupuesto');
    XLSX.writeFile(wb, 'presupuesto.xlsx');
  }

}




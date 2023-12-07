import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/material';
import { MaterialesService } from 'src/app/services/materiales.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  public materiales: Material[] = [];

  constructor(private materialesService: MaterialesService, private router: Router) { }

  ngOnInit(): void {
    console.log("Cargando materiales");
    this.materialesService.getData().subscribe(data => {
      this.materiales = data;
    })
  }

  isPopupVisible = false;
  imageUrl: string = '';

  showImagePopup(imageUrl: string) {
    this.isPopupVisible = true;
    this.imageUrl = imageUrl;
  }

  hideImagePopup() {
    this.isPopupVisible = false;
  }

  goToDetails(materialId: number) {
    this.router.navigate(["dashboard/materiales",materialId]);
  }

}

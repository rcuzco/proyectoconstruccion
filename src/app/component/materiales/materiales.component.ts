import { Component } from '@angular/core';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent {
  materiales = [
  {
    "id": 1,
    "nombre": "Concrete"
  },
  {
    "id": 2,
    "nombre": "Steel"
  },
  {
    "id": 3,
    "nombre": "Brick"
  },
  {
    "id": 4,
    "nombre": "Wood"
  },
  {
    "id": 5,
    "nombre": "Glass"
  }
];
}

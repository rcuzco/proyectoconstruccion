// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MaterialesService } from 'src/app/services/materiales.service';
// import { Material } from 'src/app/models/material';
// import { NgControlStatusGroup } from '@angular/forms';

// @Component({
//   selector: 'app-material',
//   templateUrl: './material.component.html',
//   styleUrls: ['./material.component.scss']
// })
// export class MaterialComponent implements OnInit {

//   // public materialId:number=0;

//   // constructor(private route:ActivatedRoute, private materialesService:MaterialesService)
//   // {

//   // }

//   // ngOnInit(): void {
//   //   this.route.params.subscribe(params =>
//   //     {
//   //       this.materialId = params["id"];
//   //       console.log("materialid", this.materialId);
//   //       this.materialesService.getDataById(this.materialId).subscribe(material=>
//   //         {
//   //           console.log("material", material);
//   //         });
//   //     });
//   // }

//   constructor(private route: ActivatedRoute, private materialesService: MaterialesService) { }
//   ngAfterViewInit(): void
//   {
//     // Example: Make a service call using the id
//     this.materialesService.getDataById(this.materialId).subscribe(data => {
//       this.material = data;
//       console.log(this.material);
//     });
//     // this.myService.getDataById(id).subscribe(data => {
//     //   // Process the data
//     // });
//   }
//   materialId: number = 0;
//   material!: Material;

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.materialId = params['id'];

//       // Now you can use the 'id' in your component logic
//       console.log('Received id:', this.materialId);


//     });
//   }
// }

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Material } from 'src/app/models/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit
{
  constructor(private route: ActivatedRoute, private materialesService: MaterialesService, private router: Router) { }

  materialId: number = 0;
  material!: Material;
  load: boolean = false;
  mat2: Material = {} as Material;

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.materialId = params['id'];

      // Now you can use the 'id' in your component logic
      console.log('Received id:', this.materialId);

      this.materialesService
        .getDataById(this.materialId)
        .subscribe(data =>
        {
          if (data)
          {
            this.material = data;
            console.log(this.material);
            this.load = true;
          } else
          {
            console.log("No se encontró el material");
          }

        });
    });
  }

  deleteMaterial() {
    this.materialesService.deleteMaterial(this.materialId)
      .subscribe(data => {
        if (data) {
          console.log("Material eliminado");
          this.router.navigate(['/dashboard/materiales']);
        } else {
          console.log("No se pudo eliminar el material");
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{

  public usuarios: User[] = [];

  insertForm = this.formBuilder.group({
    userName:["", [Validators.required]],
    password:["", [Validators.required]],
    userType:["", [Validators.required]],
  });

  constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      console.log("Cargando usuarios");
      this.usuariosService.getData().subscribe(data => {
        this.usuarios = data;
      })
  }

  insertarUsuario() {
    if (this.insertForm.valid) {
      let nuevoUsuario: User = {
        UserName : this.insertForm.value.userName!,
        Password : this.insertForm.value.password!,
        UserType : this.insertForm.value.userType!,
        UserId : 0
      };

      this.usuariosService.insertUser(nuevoUsuario).subscribe(
        (data:number)=>
        {
          console.log(data);
        }
      );
      }
    }
  }


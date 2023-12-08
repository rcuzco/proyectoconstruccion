import { Component, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError:string = '';

  loginForm = this.formBuilder.group(
    {
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
    private usuariosService: UsuariosService) {}

  submitForm() {
    // Verificar credenciales y realizar autenticación
    // if (this.validarCredenciales()) {
    //   // Redirigir a la página de acciones
    //   this.router.navigate(['/principal']);
    // } else {
    //   console.log('Credenciales inválidas');
    // }
    let userName: string = this.loginForm.value.userName!;
    let password: string = this.loginForm.value.password!;
    this.usuariosService.login(userName,password).subscribe(
      {
        next:(usuario)=>
        {
          if (usuario) {
            console.log("usuario",usuario);
            this.router.navigate(['/dashboard']);
          }
          else
          {
            console.log("credenciales inválidas");
            alert("credenciales incorrectas");
            this.loginError = "credenciales incorrectas";
          }
        },
        error:(errorData)=>
        {
          console.error("error en llamada", errorData);
          this.loginError = "error en llamada al back: " + errorData;
        },
        complete:()=>
        {
          console.log("llamada completada");
        }
      }
    );
  }

  irAlRegistro() {
    this.router.navigate(['auth/registro']);
  }

  // validarCredenciales(): boolean {
  //   // Implementa la lógica real de autenticación aquí
  //   // Esta es una implementación de ejemplo
  //   //return this.username === 'usuario' && this.password === 'contrasena';

  // }
}

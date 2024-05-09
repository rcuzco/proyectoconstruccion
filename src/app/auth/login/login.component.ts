import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  // ViewChild para obtener una referencia al modal de error
  @ViewChild('errorModal') errorModal!: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private globalDataService: GlobalDataService,
  ) {}

  submitForm() {
    let userName: string = this.loginForm.value.userName!;
    let password: string = this.loginForm.value.password!;
    this.clientesService.login(userName, password).subscribe({
      next: (cliente) => {
        if (cliente) {
          console.log("usuario", cliente);
          this.globalDataService.setUsuarioLogado(cliente);
          if (cliente.UserType === 'Administrador') {
            this.router.navigate(['/dashboard']);
          } else if (cliente.UserType === 'Cliente') {
            this.router.navigate(['/dashboard/materialescliente']);
          } else {
            console.log("Tipo de usuario inválido");
          }
        } else {
          console.log("credenciales inválidas");
          this.showLoginErrorModal("Credenciales incorrectas. El usuario o contraseña son incorrectos");
          this.loginError = "Credenciales incorrectas. . El usuario o contrasena son incorrectos";
        }
      },
      error: (errorData) => {
        console.error("error en llamada", errorData);
        this.showLoginErrorModal("Credenciales incorrectas. El usuario o contraseña son incorrectos");
        this.loginError = "Credenciales incorrectas. El usuario o contrasena son incorrectos";
      },
      complete: () => {
        console.log("llamada completada");
      }
    });
  }

  // Método para mostrar el modal de error de inicio de sesión
  showLoginErrorModal(errorMessage: string) {
    const modal = new bootstrap.Modal(this.errorModal.nativeElement);
    this.loginError = errorMessage;
    modal.show();
  }

  irAlRegistro() {
    this.router.navigate(['auth/registro']);
  }
}

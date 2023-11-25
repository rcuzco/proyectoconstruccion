import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  submitForm() {
    // Verificar credenciales y realizar autenticación
    if (this.validarCredenciales()) {
      // Redirigir a la página de acciones
      this.router.navigate(['/principal']);
    } else {
      console.log('Credenciales inválidas');
    }
  }

  validarCredenciales(): boolean {
    // Implementa la lógica real de autenticación aquí
    // Esta es una implementación de ejemplo
    return this.username === 'usuario' && this.password === 'contrasena';
  }
}

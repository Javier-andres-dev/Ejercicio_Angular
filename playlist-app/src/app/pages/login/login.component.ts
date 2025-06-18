import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.username, this.password).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('authToken', res.token); // ✅ guardar el token
            alert('Login exitoso');
            this.router.navigate(['/home']);
          } else {
            alert('Token no recibido');
          }
        },
        error: (err) => {
          alert('Error en login: ' + err.error?.message || 'error desconocido');
        }
      });
    } else {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          alert('Usuario registrado con éxito');
          this.isLoginMode = true;
          this.username = '';
          this.password = '';
        },
        error: (err) => {
          alert('Error al registrar: ' + err.error?.message || 'error desconocido');
        }
      });
    }
  }
}

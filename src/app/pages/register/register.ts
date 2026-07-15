import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  nombre = '';
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error.set('');
    this.loading.set(true);

    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: () => {
        // Tras registrar, hacemos login automático
        this.authService.login(this.email, this.password).subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
  this.loading.set(false);
  this.error.set(err.error?.error || 'Error al iniciar sesión');
}
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.error || 'Error al registrarse');
      }
    });
  }
}
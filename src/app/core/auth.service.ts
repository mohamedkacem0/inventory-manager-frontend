import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

export interface AuthResponse {
  token: string;
  nombre: string;
  email: string;
  rol: string;
}



const API_URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  // 'signal' es el sistema moderno de Angular para estado reactivo (similar a useState de React)
  currentUser = signal<{ nombre: string; email: string; rol: string } | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  private loadUser() {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }

  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/register`, { nombre, email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify({ nombre: res.nombre, email: res.email, rol: res.rol }));
        this.currentUser.set({ nombre: res.nombre, email: res.email, rol: res.rol });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id?: number;
  nombre: string;
}

const API_URL = 'http://localhost:8080/api/categorias';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(API_URL);
  }

  create(nombre: string): Observable<Categoria> {
    return this.http.post<Categoria>(API_URL, { nombre });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
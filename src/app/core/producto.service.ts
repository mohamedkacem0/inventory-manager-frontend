import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './categoria.service';
import { environment } from '../environments/environment';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  stock: number;
  precio: number;
  categoria?: Categoria | null;
}



const API_URL = `${environment.apiUrl}/productos`;

@Injectable({ providedIn: 'root' })
export class ProductoService {
  constructor(private http: HttpClient) {}

  getAll(categoriaId?: number): Observable<Producto[]> {
    let url = API_URL;
    if (categoriaId) {
      url += `?categoriaId=${categoriaId}`;
    }
    return this.http.get<Producto[]>(url);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(API_URL, producto);
  }

  update(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${API_URL}/${id}`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../core/categoria.service';
import { Producto } from '../../core/producto.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  @Input() categorias: Categoria[] = [];
  @Output() create = new EventEmitter<Partial<Producto>>();

  nombre = '';
  stock: number | null = null;
  precio: number | null = null;
  categoriaId: number | null = null;

  onSubmit() {
    if (!this.nombre.trim() || this.stock === null || this.precio === null) return;

    this.create.emit({
      nombre: this.nombre,
      stock: this.stock,
      precio: this.precio,
      categoria: this.categoriaId ? { id: this.categoriaId, nombre: '' } : null,
    });

    this.nombre = '';
    this.stock = null;
    this.precio = null;
    this.categoriaId = null;
  }
}
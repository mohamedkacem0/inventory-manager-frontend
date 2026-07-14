import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../core/categoria.service';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category-sidebar.html',
  styleUrl: './category-sidebar.css'
})
export class CategorySidebar {
  @Input() categorias: Categoria[] = [];
  @Input() selectedCategoriaId: number | null = null;

  @Output() select = new EventEmitter<number | null>();
  @Output() create = new EventEmitter<string>();
  @Output() delete = new EventEmitter<number>();

  newCategoria = '';

  onCreate() {
    if (!this.newCategoria.trim()) return;
    this.create.emit(this.newCategoria);
    this.newCategoria = '';
  }
}
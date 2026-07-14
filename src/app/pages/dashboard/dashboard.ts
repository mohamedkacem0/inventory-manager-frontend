import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { CategoriaService, Categoria } from '../../core/categoria.service';
import { ProductoService, Producto } from '../../core/producto.service';
import { Router } from '@angular/router';
import { CategorySidebar } from '../../components/category-sidebar/category-sidebar';
import { ProductForm } from '../../components/product-form/product-form';
import { ProductList } from '../../components/product-list/product-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategorySidebar, ProductForm, ProductList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  categorias = signal<Categoria[]>([]);
  productos = signal<Producto[]>([]);
  selectedCategoriaId = signal<number | null>(null);

  constructor(
    public authService: AuthService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategorias();
    this.loadProductos();
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe((data) => this.categorias.set(data));
  }

  loadProductos() {
    const catId = this.selectedCategoriaId() ?? undefined;
    this.productoService.getAll(catId).subscribe((data) => this.productos.set(data));
  }

  onSelectCategoria(id: number | null) {
    this.selectedCategoriaId.set(id);
    this.loadProductos();
  }

  onCreateCategoria(nombre: string) {
    this.categoriaService.create(nombre).subscribe(() => this.loadCategorias());
  }

  onDeleteCategoria(id: number) {
    this.categoriaService.delete(id).subscribe(() => {
      if (this.selectedCategoriaId() === id) this.selectedCategoriaId.set(null);
      this.loadCategorias();
      this.loadProductos();
    });
  }

  onCreateProducto(producto: Partial<Producto>) {
    this.productoService.create(producto as Producto).subscribe(() => this.loadProductos());
  }

  onDeleteProducto(id: number) {
    this.productoService.delete(id).subscribe(() => this.loadProductos());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
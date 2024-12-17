import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['imageUrl','name', 'price', 'description','stock','status'];
  searchTerm: string = '';
  totalCount = 0;

  currentPage = 1;
  pageSize = 5;

  constructor(
    private productService: ProductService, private dialog: MatDialog, private router: Router,
   private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.products = response.items;
          this.totalCount = response.totalRecords;
        },
        error: (error) => {
          console.error('Error al cargar los productos:', error);
        },
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  editProduct(product: any): void {
    if (product?.id) {
      this.router.navigate(['/products/edit', product.id]);
    } else {
      console.error('Error: El producto no tiene ID');
    }
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Producto',
        message: '¿Estás seguro de que quieres eliminar este producto?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe({
          next: () => this.toastr.success('Producto eliminado', '¡Eliminado!'),
          error: () => this.toastr.error('Error al eliminar el producto', 'Error'),
        });
      }
    });
  }

  viewDetails(product: any): void {
    this.dialog.open(ProductDetailComponent, {
      data: product,
      width: '750px',
    });
  }
}

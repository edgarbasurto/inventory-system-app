import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatOptionModule, 
    MatSelectModule,
    MatCardModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm!: FormGroup;
  isEditMode = false;
  productId!: number; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      status: ['Available', Validators.required],
      imageUrl: [''],
    });


    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      console.log(this.productId);
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }


  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos', 'Error');
      return;
    }
      
    const productData = this.productForm.value;

    if (this.isEditMode) {

      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.toastr.success('Producto actualizado correctamente', '¡Éxito!');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(productData).subscribe(() => {
        this.toastr.success('Producto guardado correctamente', '¡Éxito!');
        this.router.navigate(['/products']);
      });
    }
  }


  onCancel(): void {
    this.router.navigate(['/products']);
  }
}

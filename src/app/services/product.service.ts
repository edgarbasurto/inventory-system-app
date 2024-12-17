import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  stock: number;
  imageUrl: string;
  createdAt: string;
}

export interface PaginatedResponse {
  items: Product[];
  totalRecords: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5057/api/products';

  constructor(private http: HttpClient) {}

  
  getProducts(
    page: number,
    pageSize: number,
    search: string = ''
  ): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error al obtener productos:', error);
        throw error;
      })
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }


  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
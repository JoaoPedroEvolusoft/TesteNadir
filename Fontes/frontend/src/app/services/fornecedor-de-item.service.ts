import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FornecedorDeItem } from '../models/fornecedor-de-item.model';

const baseUrl = 'http://localhost:8080/api/fornecedoresDeItens';

@Injectable({
  providedIn: 'root'
})
export class FornecedorDeItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FornecedorDeItem[]> {
    return this.http.get<FornecedorDeItem[]>(baseUrl);
  }

  get(id: any): Observable<FornecedorDeItem> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByCodigo(codigo: any): Observable<FornecedorDeItem[]> {
    return this.http.get<FornecedorDeItem[]>(`${baseUrl}?codigo=${codigo}`);
  }
}

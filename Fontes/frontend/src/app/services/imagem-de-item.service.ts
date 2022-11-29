import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagemDeItem } from '../models/imagem-de-item.model';

const baseUrl = 'http://localhost:8080/api/imagensDeItens';

@Injectable({
  providedIn: 'root'
})
export class ImagemDeItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ImagemDeItem[]> {
    return this.http.get<ImagemDeItem[]>(baseUrl);
  }

  get(id: any): Observable<ImagemDeItem> {
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

  findByDescricao(descricao: any): Observable<ImagemDeItem[]> {
    return this.http.get<ImagemDeItem[]>(`${baseUrl}?descricao=${descricao}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parceiro } from '../models/parceiro.model';

const baseUrl = 'http://localhost:8080/api/parceiros';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Parceiro[]> {
    return this.http.get<Parceiro[]>(baseUrl);
  }

  get(id: any): Observable<Parceiro> {
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

  findByNome(nome: any): Observable<Parceiro[]> {
    return this.http.get<Parceiro[]>(`${baseUrl}?nome=${nome}`);
  }
}

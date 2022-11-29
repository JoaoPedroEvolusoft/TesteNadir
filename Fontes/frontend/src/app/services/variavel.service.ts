import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Variavel } from '../models/variavel.model';

const baseUrl = 'http://localhost:8080/api/variaveis';

@Injectable({
  providedIn: 'root'
})
export class VariavelService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Variavel[]> {
    return this.http.get<Variavel[]>(baseUrl);
  }

  get(id: any): Observable<Variavel> {
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

  findByNome(nome: any): Observable<Variavel[]> {
    return this.http.get<Variavel[]>(`${baseUrl}?nome=${nome}`);
  }
}

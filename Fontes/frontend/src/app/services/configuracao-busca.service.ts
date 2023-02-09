import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiguracaoBusca } from '../models/configuracao-busca.model';

const baseUrl = 'http://localhost:8080/api/configuracoesBuscas';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoBuscaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ConfiguracaoBusca[]> {
    return this.http.get<ConfiguracaoBusca[]>(baseUrl);
  }

  get(id: any): Observable<ConfiguracaoBusca> {
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

  findByDescricao(descricao: any): Observable<ConfiguracaoBusca[]> {
    return this.http.get<ConfiguracaoBusca[]>(`${baseUrl}?descricao=${descricao}`);
  }

  start(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/puppeteer`,data);
  }
  start2(items: any): Observable<any> {
    return this.http.post(`${baseUrl}/puppeteer/a`,items);
  }
  start3(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/puppeteer/b`,data);
  }
}

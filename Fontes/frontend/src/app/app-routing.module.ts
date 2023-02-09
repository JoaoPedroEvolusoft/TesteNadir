import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DetailsItemComponent } from './components/details-item/details-item.component'; 
import { ListParceiroComponent } from './components/list-parceiro/list-parceiro.component';
import { AddParceiroComponent } from './components/add-parceiro/add-parceiro.component';
import { DetailsParceiroComponent } from './components/details-parceiro/details-parceiro.component'; 
import { ListConfiguracaoBuscaComponent } from './components/list-configuracao-busca/list-configuracao-busca.component';
import { AddConfiguracaoBuscaComponent } from './components/add-configuracao-busca/add-configuracao-busca.component';
import { DetailsConfiguracaoBuscaComponent } from './components/details-configuracao-busca/details-configuracao-busca.component'; 
import { AddImageComponent } from './components/add-image/add-image.component';
import { ListImageComponent } from './components/list-image/list-image.component';
import { BuscasComponent } from './components/buscas/buscas.component';


const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' }, 

  { path: 'itens', component: ListItemComponent },
  { path: 'itens/:id', component: DetailsItemComponent }, 
  { path: 'add/item', component: AddItemComponent }, 
  { path: 'parceiros', component: ListParceiroComponent },
  { path: 'parceiros/:id', component: DetailsParceiroComponent }, 
  { path: 'add/parceiro', component: AddParceiroComponent }, 
  { path: 'configuracoesBuscas', component: ListConfiguracaoBuscaComponent },
  { path: 'configuracoesBuscas/:id', component: DetailsConfiguracaoBuscaComponent }, 
  { path: 'add/configuracaoBuscas', component: AddConfiguracaoBuscaComponent }, 
  { path: 'add/image/:id', component: AddImageComponent }, 
  { path: 'image/:id', component: ListImageComponent },
  { path: 'buscas/:id' , component : BuscasComponent}


];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

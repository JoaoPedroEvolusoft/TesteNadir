import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { Item } from 'src/app/models/item.model';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';
import { ImageService } from 'src/app/services/image.service';
import { ItemService } from 'src/app/services/item.service';
import { ParceiroService } from 'src/app/services/parceiro.service';
import {ChangeDetectionStrategy, Input} from '@angular/core';
 
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  pageNumber= 20;
  estaCarregandoSpinner: boolean = true
  parceiroSolo:Parceiro={};
  parceiroDesc? = '';

  parceiroCollection?: Parceiro[];
  selected = this.parceiroCollection;
  ItemCollection?: Item[];
  ConfiguracoesCollection?: ConfiguracaoBusca[];
  currentItem: Item = {};
  currentConfiguracoes: ConfiguracaoBusca = {};
  itemTroca: any=[];


  currentIndex = -1;
  debug = true;
  descricao = '';
  base64Data: any;
  fornecedor = '';
  buttonAtivado = true;
item: any;

  constructor(private itemService: ItemService,
              private imageService: ImageService,
              private configuracoesbuscaService: ConfiguracaoBuscaService,
              private parceiroService: ParceiroService) { }

  
  ngOnInit(): void {
    for(let i=1;i<=100;i++){
      this.post.push(i);
    }
    this.retrieveItensPage(0,10);
    this.retrieveParceiros();
   
  }
  post:any=[];
  onScroll(){
    // this.pageNumber = this.pageNumber+10;
    console.log('Down');
    // this.retrieveItensPage(1,this.pageNumber);
  }
  retrieveParceiros(): void{
    this.parceiroService.getAll()
      .subscribe(
        data => {
          this.parceiroCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setarConfiguracoes(): void{
    this.buttonAtivado = false;
    this.retriveConfiguracoes();
  }
  retriveConfiguracoes(): void{
    this.configuracoesbuscaService.getAll()
    .subscribe(
      data=> {
        this.ConfiguracoesCollection = data;
        if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
      }
  retrieveItens(): void {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.ItemCollection = data;
          this.estaCarregandoSpinner = false;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveItensPage(page:any,limit:any): void {
    this.itemService.getPage(page,limit).subscribe(data=>{
      this.ItemCollection=data;
      this.estaCarregandoSpinner = false;
    })
  }
  refreshList(): void {
    this.retrieveItensPage(0,10);
    this.currentItem = {};
    this.currentConfiguracoes = {};
    this.currentIndex = -1;
  }
  setActiveConfig(configuracaoBusca : ConfiguracaoBusca){
    this.currentConfiguracoes= configuracaoBusca;
    
  }
  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
    this.imageRetriever();
    
  }

  removeAllItens(): void {
    this.itemService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchDescricao(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByDescricao(this.descricao,0,100)
      .subscribe(
        data => {
          this.ItemCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  searchFornecedor(): void{
      this.currentItem = {};
      this.currentIndex = -1;
       
      this.itemService.findByFornecedor(this.selected)
        .subscribe(
          data => {
            this.ItemCollection = data;
            if (this.debug) console.log(data);
          },
          error => {
            console.log(error);
          });
  }

  imageRetriever() {
    console.log(this.currentItem.imagensdoitem);
    this.imageService.getById(this.currentItem.imagensdoitem)
    .subscribe(
      data => {
        if (this.debug) console.log(data);
        this.base64Data = data;
      }
    )
  }

  deleteItem(item: Item): void {
    this.itemService.delete(item.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }


  realizarBusca(configuracaoBusca: ConfiguracaoBusca): void{

      this.ItemCollection?.forEach((item)=>{
        const data = {
          item: item.item,
          descricao: item.descricao,
          barras: item.barras,
          quantidadeEstoque:item.quantidadeEstoque,
          preco: item.preco,
          precominimo: item.precominimo,
          referencia: item.referencia,
          marca: item.marca,
          parceiro: item.parceiro,
          config: configuracaoBusca,
        };
          this.itemTroca.push(data);
      });
  

      console.log(this.itemTroca);


      this.configuracoesbuscaService.start2(this.itemTroca)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
        this.itemTroca=[];
  }
  OnPageChange(event: PageEvent) {
    this.estaCarregandoSpinner=true;
    console.log(event);
    setTimeout(() => {
      this.retrieveItensPage(event.pageIndex+1,event.pageSize);
    }, 500);
    
    
    }
    teste(): void{
      console.log("ola mundo");
    }
    
}


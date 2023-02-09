import { Component, OnInit } from '@angular/core';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { Item } from 'src/app/models/item.model';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';
import { ImageService } from 'src/app/services/image.service';
import { ItemService } from 'src/app/services/item.service';
import { ParceiroService } from 'src/app/services/parceiro.service';

 
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

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
    this.retrieveItens();
    this.retrieveParceiros();
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
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveItens();
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

    this.itemService.findByDescricao(this.descricao)
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
}

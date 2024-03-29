import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';

@Component({
  selector: 'app-list-configuracao-busca',
  templateUrl: './list-configuracao-busca.component.html',
  styleUrls: ['./list-configuracao-busca.component.css']
})
export class ListConfiguracaoBuscaComponent implements OnInit {
  estaCarregandoSpinner: boolean = true
  ConfiguracaoBuscaCollection?: ConfiguracaoBusca[];
  currentConfiguracaoBusca: ConfiguracaoBusca = {};
  currentIndex = -1;
  debug = true;
  descricao = '';
  message='';
  constructor(private configuracaoBuscaService: ConfiguracaoBuscaService) { }

  ngOnInit(): void {
    this.retrieveConfiguracoesBuscaPage(0,10);
  }

  retrieveConfiguracoesBuscas(): void {
    this.configuracaoBuscaService.getAll()
      .subscribe(
        data => {
          this.ConfiguracaoBuscaCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveConfiguracoesBuscas();
    this.currentConfiguracaoBusca = {};
    this.currentIndex = -1;
  }
  OnPageChange(event: PageEvent) {
    this.estaCarregandoSpinner=true;
    console.log(event);
    setTimeout(() => {
      this.retrieveConfiguracoesBuscaPage(event.pageIndex+1,event.pageSize);
    }, 500);
  }
  setActiveConfiguracaoBusca(configuracaoBusca: ConfiguracaoBusca, index: number): void {
    this.currentConfiguracaoBusca = configuracaoBusca;
    this.currentIndex = index;
  }

  removeAllConfiguracoesBuscas(): void {
    this.configuracaoBuscaService.deleteAll()
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
    this.currentConfiguracaoBusca = {};
    this.currentIndex = -1;

    this.configuracaoBuscaService.findByDescricao(this.descricao)
      .subscribe(
        data => {
          this.ConfiguracaoBuscaCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  realizarBusca(): void{
    this.configuracaoBuscaService.start(this.currentConfiguracaoBusca)
    .subscribe(
      (response) => {
              if (this.debug) console.log(response);
              this.message = response.message
                ? response.message
                : 'Deu Certo!';
            },
            (error) => {
              console.log(error);
            });
  }

  deleteConfiguracaoBusca(configuracaoBusca: ConfiguracaoBusca): void {
    this.configuracaoBuscaService.delete(configuracaoBusca.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }
  retrieveConfiguracoesBuscaPage(page:any,limit:any): void {
    this.configuracaoBuscaService.getPage(page,limit).subscribe(data=>{
      this.ConfiguracaoBuscaCollection=data;
      this.estaCarregandoSpinner = false;
    })
  }
  // realizarBusca(): void{
  //   this.buscaPuppeteer.start().subscribe(
  //     (response) => {
  //       if (this.debug) console.log(response);
  //       this.message = response.message
  //         ? response.message
  //         : 'Deu Certo!';
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}

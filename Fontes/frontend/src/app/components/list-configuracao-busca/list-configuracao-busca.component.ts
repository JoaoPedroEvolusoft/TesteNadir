import { Component, OnInit } from '@angular/core';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';

@Component({
  selector: 'app-list-configuracao-busca',
  templateUrl: './list-configuracao-busca.component.html',
  styleUrls: ['./list-configuracao-busca.component.css']
})
export class ListConfiguracaoBuscaComponent implements OnInit {

  ConfiguracaoBuscaCollection?: ConfiguracaoBusca[];
  currentConfiguracaoBusca: ConfiguracaoBusca = {};
  currentIndex = -1;
  debug = true;
  descricao = '';

  constructor(private configuracaoBuscaService: ConfiguracaoBuscaService) { }

  ngOnInit(): void {
    this.retrieveConfiguracoesBuscas();
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
}

import { Component, OnInit } from '@angular/core';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';

@Component({
  selector: 'app-details-configuracao-busca',
  templateUrl: './details-configuracao-busca.component.html',
  styleUrls: ['./details-configuracao-busca.component.css']
})
export class DetailsConfiguracaoBuscaComponent implements OnInit {

  configuracaoBusca: ConfiguracaoBusca = {
    codigo: 0,
    descricao: '',
    urlbusca: '',
  };

  variavel1='';
  variavel2='';
  variavel3='';

  message = '';
  debug = true;


  constructor(
    private configuracaoBuscaService: ConfiguracaoBuscaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getConfiguracaoBusca(this.route.snapshot.params['id']);
  }

  getConfiguracaoBusca(id: string): void {
    this.configuracaoBuscaService.get(id)
      .subscribe(
        data => {
          this.configuracaoBusca = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateConfiguracaoBusca(): void {
    this.message = '';
    this.configuracaoBusca.variaveis=[];
    this.configuracaoBusca.variaveis?.push(this.variavel1);
    this.configuracaoBusca.variaveis?.push(this.variavel2);
    this.configuracaoBusca.variaveis?.push(this.variavel3);
    this.configuracaoBuscaService.update(this.configuracaoBusca.id, this.configuracaoBusca)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'A entidade ConfiguracaoBuscaEditor foi atualizada com sucesso!';
        },
        error => {
          console.log(error);
        });
  }

  deleteConfiguracaoBusca(configuracaoBusca: ConfiguracaoBusca): void {
    this.configuracaoBuscaService.delete(configuracaoBusca.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/configuracoesBuscas']);
        },
        error => {
          console.log(error);
        });
  }
}

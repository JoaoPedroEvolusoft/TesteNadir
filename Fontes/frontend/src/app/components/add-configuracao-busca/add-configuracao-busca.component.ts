import { Component, OnInit } from '@angular/core';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';
import {MatMenuModule} from '@angular/material/menu';
import { Parceiro } from 'src/app/models/parceiro.model';


@Component({
  selector: 'app-add-configuracao-busca',
  templateUrl: './add-configuracao-busca.component.html',
  styleUrls: ['./add-configuracao-busca.component.css']
})
export class AddConfiguracaoBuscaComponent implements OnInit {

  configuracaoBusca: ConfiguracaoBusca = {
    codigo: 0,
    descricao: '',
    urlbusca: '',
    parceiro:'',
    variaveis:'',
  };
  submitted = false;
  debug = true;


  constructor(private configuracaoBuscaService: ConfiguracaoBuscaService,) { }

  ngOnInit(): void {
  }

  saveConfiguracaoBusca(): void {
    const data = {
      codigo: this.configuracaoBusca.codigo,
      descricao: this.configuracaoBusca.descricao,
      parceiro: this.configuracaoBusca.parceiro,
      urlbusca: this.configuracaoBusca.urlbusca,
      variaveis: this.configuracaoBusca.variaveis
    };

    this.configuracaoBuscaService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newConfiguracaoBusca(): void {
    this.submitted = false;
    this.debug = true;

    this.configuracaoBusca = {
      codigo: 0,
      descricao: '',
      urlbusca: '',
      parceiro: '',
      variaveis:'',
    };
  }
}

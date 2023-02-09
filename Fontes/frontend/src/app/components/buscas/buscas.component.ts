import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracaoBusca } from 'src/app/models/configuracao-busca.model';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ConfiguracaoBuscaService } from 'src/app/services/configuracao-busca.service';
import { ParceiroService } from 'src/app/services/parceiro.service';

@Component({
  selector: 'app-buscas',
  templateUrl: './buscas.component.html',
  styleUrls: ['./buscas.component.css']
})
export class BuscasComponent implements OnInit {

  ConfiguracoesCollection? : ConfiguracaoBusca[];
  currentIndex=-1;
  parceiro: Parceiro= {
    parceiro: 0,
    nome: '',
    fantasia: '',
    cpfCnpj: '',
    site: '',
    telefone: ''
  };
  message = '';
  debug = true;

  constructor(private parceiroService : ParceiroService,private route: ActivatedRoute,
    private configuracoesbuscaService : ConfiguracaoBuscaService) { }

  ngOnInit(): void {
    this.getParceiro(this.route.snapshot.params['id']);
    this.retriveConfiguracoes();
  }



  getParceiro(id: string): void {
    this.parceiroService.get(id)
      .subscribe(
        data => {
          this.parceiro = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
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


  realizarBusca(configuracaoBusca: ConfiguracaoBusca, parceiro: Parceiro): void{
  

      const data = {
        configuracaoBusca: configuracaoBusca,
        parceiro: parceiro,
      };
    
      console.log(data);
    this.configuracoesbuscaService.start3(data)
    .subscribe(
      response => {
        if (this.debug) console.log(response);
      },
      error => {
        console.log(error);
      });
}
}

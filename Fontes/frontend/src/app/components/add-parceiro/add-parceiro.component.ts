import { Component, OnInit } from '@angular/core';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ParceiroService } from 'src/app/services/parceiro.service';

@Component({
  selector: 'app-add-parceiro',
  templateUrl: './add-parceiro.component.html',
  styleUrls: ['./add-parceiro.component.css']
})
export class AddParceiroComponent implements OnInit {

  parceiro: Parceiro = {
    parceiro: 0,
    nome: '',
    fantasia: '',
    cpfCnpj: '',
    site: '',
    telefone: ''
  };
  submitted = false;
  debug = true;


  constructor(private parceiroService: ParceiroService) { }

  ngOnInit(): void {
  }

  saveParceiro(): void {
    const data = {
      parceiro: this.parceiro.parceiro,
      nome: this.parceiro.nome,
      fantasia: this.parceiro.fantasia,
      cpfCnpj: this.parceiro.cpfCnpj,
      site: this.parceiro.site,
      telefone: this.parceiro.telefone
    };

    this.parceiroService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newParceiro(): void {
    this.submitted = false;
    this.debug = true;

    this.parceiro = {
      parceiro: 0,
      nome: '',
      fantasia: '',
      cpfCnpj: '',
      site: '',
      telefone: ''
    };
  }
}

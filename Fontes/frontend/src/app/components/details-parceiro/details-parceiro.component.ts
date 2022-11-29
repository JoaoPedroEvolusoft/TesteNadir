import { Component, OnInit } from '@angular/core';
import { ParceiroService } from 'src/app/services/parceiro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Parceiro } from 'src/app/models/parceiro.model';

@Component({
  selector: 'app-details-parceiro',
  templateUrl: './details-parceiro.component.html',
  styleUrls: ['./details-parceiro.component.css']
})
export class DetailsParceiroComponent implements OnInit {

  parceiro: Parceiro = {
    parceiro: 0,
    nome: '',
    fantasia: '',
    cpfCnpj: '',
    site: '',
    telefone: ''
  };
  message = '';
  debug = true;


  constructor(
    private parceiroService: ParceiroService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getParceiro(this.route.snapshot.params['id']);
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

  updateParceiro(): void {
    this.message = '';

    this.parceiroService.update(this.parceiro.id, this.parceiro)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'A entidade ParceiroEditor foi atualizada com sucesso!';
        },
        error => {
          console.log(error);
        });
  }

  deleteParceiro(): void {
    this.parceiroService.delete(this.parceiro.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/parceiros']);
        },
        error => {
          console.log(error);
        });
  }
}

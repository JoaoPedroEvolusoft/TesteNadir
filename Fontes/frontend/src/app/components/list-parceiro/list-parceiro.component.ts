import { Component, OnInit } from '@angular/core';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ParceiroService } from 'src/app/services/parceiro.service';

@Component({
  selector: 'app-list-parceiro',
  templateUrl: './list-parceiro.component.html',
  styleUrls: ['./list-parceiro.component.css']
})
export class ListParceiroComponent implements OnInit {

  ParceiroCollection?: Parceiro[];
  currentParceiro: Parceiro = {};
  currentIndex = -1;
  debug = true;
  nome = '';

  constructor(private parceiroService: ParceiroService) { }

  ngOnInit(): void {
    this.retrieveParceiros();
  }

  retrieveParceiros(): void {
    this.parceiroService.getAll()
      .subscribe(
        data => {
          this.ParceiroCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveParceiros();
    this.currentParceiro = {};
    this.currentIndex = -1;
  }

  setActiveParceiro(parceiro: Parceiro, index: number): void {
    this.currentParceiro = parceiro;
    this.currentIndex = index;
  }

  removeAllParceiros(): void {
    this.parceiroService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchNome(): void {
    this.currentParceiro = {};
    this.currentIndex = -1;

    this.parceiroService.findByNome(this.nome)
      .subscribe(
        data => {
          this.ParceiroCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

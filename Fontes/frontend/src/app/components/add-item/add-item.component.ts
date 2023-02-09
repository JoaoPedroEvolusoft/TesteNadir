import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Parceiro } from 'src/app/models/parceiro.model';
import { ItemService } from 'src/app/services/item.service';
import { ParceiroService } from 'src/app/services/parceiro.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  debug: boolean = true;
  selected = this.parceiroCollection;
  item: Item = {};
  parceiroCollection? : Parceiro[];


  constructor(private itemService: ItemService,
              private route: Router,private parceiroService: ParceiroService) { }

  ngOnInit(): void {
    this.retrieveParceiros();
  }

  teste(){

    const data = {
      item: this.item.item,
      descricao: this.item.descricao,
      barras: this.item.barras,
      quantidadeEstoque: this.item.quantidadeEstoque,
      preco: this.item.preco,
      precominimo: this.item.precominimo,
      referencia: this.item.referencia,
      marca: this.item.marca,
      parceiro: this.item.parceiro,
    };
console.log(data);

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
  saveItem(): void {   
    const data = {
      item: this.item.item,
      descricao: this.item.descricao,
      barras: this.item.barras,
      quantidadeEstoque: this.item.quantidadeEstoque,
      preco: this.item.preco,
      precominimo: this.item.precominimo,
      referencia: this.item.referencia,
      marca: this.item.marca,
      parceiro: this.selected,
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);

          this.route.navigate(['/itens']);
        },
        error => {
          console.log(error);
        });
  }
}
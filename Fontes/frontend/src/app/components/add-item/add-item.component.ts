import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    item: 0,
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
  };
  submitted = false;
  debug = true;


  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
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
      imagensdoitem: this.item.imagensdoitem
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newItem(): void {
    this.submitted = false;
    this.debug = true;

    this.item = {
      item: 0,
      descricao: '',
      barras: '',
      quantidadeEstoque: 0,
      preco: 0,
      precominimo: 0,
      referencia: '',
      marca: '',
    };
  }
}

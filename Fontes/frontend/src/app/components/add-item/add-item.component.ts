import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  debug: boolean = true;

  item: Item = {};

  constructor(private itemService: ItemService,
              private route: Router,) { }

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
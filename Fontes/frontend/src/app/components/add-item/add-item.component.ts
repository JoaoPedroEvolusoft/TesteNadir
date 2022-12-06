import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagemDeItem } from 'src/app/models/imagem-de-item.model';
import { Item } from 'src/app/models/item.model';
import { ImagemDeItemService } from 'src/app/services/imagem-de-item.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  debug: boolean = false;
  imgItem: ImagemDeItem = {
    imagemdeitem: undefined,
    descricao: undefined,
    link: undefined,
  };

  item = new Item;
  imgItemCollection?: ImagemDeItem[];




  constructor(private itemService: ItemService,
              private imagemdoItemService: ImagemDeItemService,
              private route: Router,) { }

  ngOnInit(): void {
    this.retrieveImg();
  }

  retrieveImg(): void {
    this.imagemdoItemService.getAll()
      .subscribe(
        data => {
          this.imgItemCollection = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveItem(): void {     
    this.itemService.create(this.item)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
         
        },
        error => {
          console.log(error);
        });
      this.route.navigate(['/add/image/'+this.item.id]);
  }

  saveImg(){
    this.imagemdoItemService.create(this.imgItem)
    .subscribe(
      response => {
        console.log(response);
        this.item.imagensdoitem = [response];
      },
      error => {
        console.log(error);
      });
      this.retrieveImg();
    }

  newItem(): void {
    this.item = new Item;
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

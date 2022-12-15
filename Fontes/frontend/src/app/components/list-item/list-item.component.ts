import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ImageService } from 'src/app/services/image.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  ItemCollection?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  debug = true;
  descricao = '';
  base64Data: any;

  constructor(private itemService: ItemService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.retrieveItens();
  }

  retrieveItens(): void {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.ItemCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveItens();
    this.currentItem = {};
    this.currentIndex = -1;
  }

  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
    this.imageRetriever();
  }

  removeAllItens(): void {
    this.itemService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchDescricao(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByDescricao(this.descricao)
      .subscribe(
        data => {
          this.ItemCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  imageRetriever() {
    console.log(this.currentItem.imagensdoitem);
    this.imageService.getById(this.currentItem.imagensdoitem)
    .subscribe(
      data => {
        if (this.debug) console.log(data);
        this.base64Data = data;
      }
    )
  }
}

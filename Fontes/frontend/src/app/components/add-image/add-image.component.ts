import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemDeItem } from 'src/app/models/imagem-de-item.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  item = new Item;
  image = new ImagemDeItem;
  srcResult: any;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.getItem(this.route.snapshot.params['id']);
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.item = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveImage(): void {
    let data = {
      descricao: this.image.descricao,
      link: this.image.link,
    };

    this.itemService.createImage(this.item.id, data)
      .subscribe(
        response => {
          let newItem = response;
          this.itemService.update(this.item.id, newItem).subscribe(
            response => {
              console.log(response);
              this.item = response;
            },
            error => {
              console.log(error);
            });
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.router.navigate(['/itens']);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}

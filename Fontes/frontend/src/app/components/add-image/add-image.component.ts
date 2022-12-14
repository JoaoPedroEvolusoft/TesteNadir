import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemDeItem } from 'src/app/models/imagem-de-item.model';
import { Item } from 'src/app/models/item.model';
import { ImageService } from 'src/app/services/image.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  item = new Item;
  image = new ImagemDeItem;
  file: any;
  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;
  id = '';

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.getItem(this.route.snapshot.params['id']);
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.id = id;
          this.item = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveImage(): void {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.imageService.upload(file, this.id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });

    /*let data = {
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
    this.router.navigate(['/itens']);*/
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.file = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}

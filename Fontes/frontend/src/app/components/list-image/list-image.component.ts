import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item.model';
import { observable } from 'rxjs';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css'],
})
export class ListImageComponent implements OnInit {
  imageUrl: any;
  idimgs = '63ae3b65922a4a4ec143f9b2';
  listImage: any[] = [];
  listImageId: any[] = [];
  currentItem: Item = {};

  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
    imagensdoitem: [],
  };
  debug = true;
  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getItem(this.route.snapshot.params['id']);
    /*this.imageService.getById(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.img.data);
    });*/
  }

  getItem(id: string): void {
    this.itemService.get(id).subscribe(
      (data) => {
        this.item = data;
        this.currentItem = data;
        for (let i = 0; i < 100; i++) {
          this.item.imagensdoitem?.pop();
        }
        console.log(this.item.imagensdoitem);

        for (let index = 0; index < 5; index++) {
          console.log(this.item.item);
          const StringCaminho =
            'assets/'+this.item.descricao+'/img' + this.item.descricao + '_' + index + '.jpg';
          this.item.imagensdoitem?.push(StringCaminho);
        }

        console.log(this.item);
        this.updateItem(this.item.id, this.item);

        // this.imageService.getById(id).subscribe((data: any) => {
        //   this.listImage = data;
        //   console.log(this.listImage);
        //   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ data.img.data);
        //   this.listImageId.push(this.imageUrl);
        // });

        if (this.debug) console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateItem(id: any, data: any): void {
    this.message = '';

    this.itemService.update(id, data).subscribe(
      (response) => {
        if (this.debug) console.log(response);
        this.message = response.message
          ? response.message
          : 'A entidade ItemEditor foi atualizada com sucesso!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
}

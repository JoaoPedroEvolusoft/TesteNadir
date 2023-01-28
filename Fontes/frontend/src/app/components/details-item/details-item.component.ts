import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
    fornecedoresdoitem:'',
  };
  message = '';
  debug = true;


  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.params['id']);
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.item = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {
    this.message = '';

    this.itemService.update(this.item.id, this.item)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'A entidade ItemEditor foi atualizada com sucesso!';
        },
        error => {
          console.log(error);
        });
  }

  deleteItem(): void {
    this.itemService.delete(this.item.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/itens']);
        },
        error => {
          console.log(error);
        });
  }
}

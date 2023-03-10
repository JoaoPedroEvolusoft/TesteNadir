import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {
  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
    parceiro: {},
  };
  debug=true;
  numero="";
  submitted=false;
  constructor(private itemService: ItemService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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
  enviarMensagem(item: Item, numero: String): void{
    var mensagem = "*Descrição:* "+item.descricao+"\n"+"*Código:* "+item.item+"\n"+"*Preço:* R$ "+item.preco;
    
    mensagem = window.encodeURIComponent(mensagem);

    // console.log(mensagem);
    if(numero.length!=0){
    window.open("https://api.whatsapp.com/send?phone=55" + numero + "&text=" + mensagem, "_blank");
  }
  }
  
}

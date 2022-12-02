import { ImagemDeItem } from "./imagem-de-item.model";
import { FornecedorDeItem } from "./fornecedor-de-item.model";

export class Item {
    id?: any;
    item?: number;
    descricao?: string;
    barras?: string;
    quantidadeEstoque?: number;
    preco?: number;
    precominimo?: number;
    referencia?: string;
    marca?: string;
    imagensdoitem?: string;
    fornecedoresdoitem?: FornecedorDeItem[];
}


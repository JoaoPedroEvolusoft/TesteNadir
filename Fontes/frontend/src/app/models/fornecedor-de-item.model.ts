import { Parceiro } from "./parceiro.model";
import { Item } from "./item.model";

export class FornecedorDeItem {
    id?: any;
    codigo?: string;
    parceiro?: Parceiro;
    item?: Item;
}


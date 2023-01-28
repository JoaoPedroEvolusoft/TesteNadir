import { Parceiro } from "./parceiro.model";
import { Variavel } from "./variavel.model";

export class ConfiguracaoBusca {
    id?: any;
    codigo?: number;
    descricao?: string;
    parceiro?: string;
    urlbusca?: string;
    variaveis?: string[];
    caminhoImagem?: string;
}


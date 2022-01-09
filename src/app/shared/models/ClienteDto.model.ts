import {EnderecoDto} from "./EnderecoDto.model";
import {TelefoneDto} from "./TelefoneDto.model";

export interface ClienteDto {
  id: number;
  nome: string;
  cpf: string;
  emails: string[];
  telefones: TelefoneDto[];
  endereco: EnderecoDto;
}

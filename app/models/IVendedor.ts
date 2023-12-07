import { IUsuario } from "./IUsuario";
export interface IVendedor{
    idVendedor? : number; 
    usuario: IUsuario;
    razonSocial: string;
    imagenINE: string;
}
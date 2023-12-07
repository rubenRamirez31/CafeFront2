import { IUsuario } from "./IUsuario";
export interface IVendedor{
    idVendedor? : number; 
    idUsuario: IUsuario;
    razonSocial: string;
    imagenINE: string;
}
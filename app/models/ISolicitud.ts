import { IVendedor } from "./IVendedor";
import { IEstatusSolicitud } from "./IEstatusSolicitud";

export interface ISolicitud {
    idSolicitud : number,
    vendedor: IVendedor,
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    fecha: Date,
    estatusSolicitud: IEstatusSolicitud
}
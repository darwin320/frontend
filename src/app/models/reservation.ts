
import { Inventory } from "./inventory";
import { Service } from "./service";


export class Reservation{
    constructor(
        public id: number,
        public idUser: number,
        public nameClient: string,
        public salon: string,
        public cantidadAdultos: number,
        public cantidadNinos: number,
        public fecha: string,
        public fechaFin: string,
        public horaInicio: Date,
        public horaFin: Date,
        public tipoEvento: string,
        public downPayment: number,
        public priceRoomPerHour: number,
        public inventario : Inventory ,
        public checkout : boolean,
        public services? : Service[]
       
    ){
    }
}
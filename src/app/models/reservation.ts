import { Service } from "./service";

export class Reservation{
    constructor(
        public id: number,
        public idUser: number,
        public nameClient: string,
        public salon: string,
        public cantidadAdultos: number,
        public cantidadNinos: number,
        public fecha: Date,
        public horaInicio: Date,
        public horaFin: Date,
        public tipoEvento: string,
        public downPayment: number,
        public priceRoomPerHour: number,
        public services: Service[] 
    ){
    }
}
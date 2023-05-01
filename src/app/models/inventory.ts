import { Service } from "./service";

export class Inventory {
    constructor(
        public id: number,
        public reservacionId: number,
        public servicios: Service[]
    ){}
};

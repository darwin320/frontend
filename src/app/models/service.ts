export class Service {
    constructor(
        public id: number,
        public nameService: string,
        public typeService: string,
        public nameSupplier: string,
        public company: string,
        public phoneNumber: string,
        public description: string,
        public price? : number,
        public earningsPer?: number
    ){}
};

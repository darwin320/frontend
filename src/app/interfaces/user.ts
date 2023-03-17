import { Role } from "./role";

export class User {
    constructor(
        public id: number,
        public role: Role,
        public firstName: string,
        public lastName: string,
        public email: string
    ) {}
}

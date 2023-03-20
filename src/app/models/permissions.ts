export type Permission = {
    apiId: number;
    roleId: number;
    get: boolean;
    post: boolean;
    delete: boolean;
    api: {
        route: string;
    };
}

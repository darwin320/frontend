import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { Permission } from "src/app/models/permissions";
import { Role } from "src/app/models/role";
import { environment } from "src/environments/environment";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

@Injectable({
    providedIn: "root",
})
export class RolesApiService extends ApiService implements ApiWithSearch<Role> {
    public search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<Role>> {
        return from(this.getRoles(userSearch, currentSearchPage, searchLimit));
    }

    public count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public async getRoles(
        userSearch: string,
        currentPage: number,
        searchAmount: number
    ): Promise<SearchResult<Role>> {
        const result = await this.makeSearchPaginationRequest<Role>(
            "/roles/search",
            userSearch,
            currentPage,
            searchAmount
        );

        return result.unwrap();
    }

    public getRole(roleId: number) {
        return this.makeSimpleGetRequest<
            Role & {
                apisOnRoles: {
                    api: {
                        name: string;
                    };
                    get: boolean;
                    post: boolean;
                    delete: boolean;
                }[];
            }
        >(`/roles/${roleId}`);
    }

    public updateApisOnRoles(changes: any) {
        return this.makeSimplePutRequest(
            "/roles/update-apis-on-roles",
            changes
        );
    }

    public async getRolePermissions(role: Role) {
        return this.makeSimpleGetRequest<Permission[]>(
            `/permissions/${role.id}`
        );
    }

    public async createRole(roleName: string) {
        return this.observableToResult(
            this.httpClient.post(
                `${environment.apiUrl}/roles/create`,
                {
                    roleName: roleName,
                },
                {
                    withCredentials: true,
                    responseType: "text",
                }
            )
        );
    }
}

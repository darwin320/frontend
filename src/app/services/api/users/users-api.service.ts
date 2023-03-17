import { Injectable } from "@angular/core";
import { catchError, from, Observable, of } from "rxjs";
import { Role } from "src/app/models/role";

import { User } from "src/app/models/user";
import { environment } from "src/environments/environment";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

@Injectable({
    providedIn: "root",
})
export class UsersApiService extends ApiService implements ApiWithSearch<User> {
    public search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<User>> {
        return from(this.getUsers(userSearch, currentSearchPage, searchLimit));
    }

    public async count() {
        const result = await this.makeSimpleGetRequest<number>("/users/count");

        return result.unwrap();
    }

    public async getCurrentUser() {
        return this.makeSimpleGetRequest<User>("/users/current-user");
    }

    public getUser(userId: number) {
        return this.makeSimpleGetRequest<User>(`/users/get/${userId}`);
    }

    public async getUsers(
        userSearch: string,
        currentPage: number,
        searchAmount: number
    ): Promise<SearchResult<User>> {
        const result = await this.makeSearchPaginationRequest<User>(
            "/users/search",
            userSearch,
            currentPage,
            searchAmount
        );

        return result.unwrap();
    }

    public createUser(userInformation: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        return this.makeSimplePostRequest("/users/create", userInformation);
    }

    public updateUser(updateUser: User) {
        return this.observableToResult(
            this.httpClient.put(
                `${environment.apiUrl}/users/update/${updateUser.id}`,
                updateUser,
                {
                    withCredentials: true,
                }
            )
        );
    }

    public deleteUser(userId: number) {
        return this.observableToResult(
            this.httpClient.delete(
                `${environment.apiUrl}/users/delete/${userId}`,
                {
                    withCredentials: true,
                }
            )
        );
    }
}

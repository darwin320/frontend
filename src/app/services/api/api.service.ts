import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Err, Ok, Result } from "ts-results";
import { SearchResult } from "./apiTypes";

/**
 * This interface describes an API that has a search with pagination
 * and other stuff.
 */
export interface ApiWithSearch<T> {
    search(
        userSearch?: string,
        currentSearchPage?: number,
        searchLimit?: number
    ): Observable<SearchResult<T>>;

    count(): Promise<number>;
}

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(protected httpClient: HttpClient) {}
    protected makeSimpleGetRequest<T>(url: string) {
        return this.observableToResult<T>(
            this.httpClient.get(`${environment.apiUrl}${url}`, {
                withCredentials: true,
            })
        );
    }

    protected makeSimplePatchRequest<T>(url: string, body: T) {
        return this.observableToResult(
            this.httpClient.patch(`${environment.apiUrl}${url}`, body, {
                withCredentials: true,
            })
        );
    }

    protected makeSimplePutRequest<T>(url: string, body: T) {
        return this.observableToResult(
            this.httpClient.put(`${environment.apiUrl}${url}`, body, {
                withCredentials: true,
            })
        );
    }

    protected makeSimplePostRequest<T>(url: string, body: any) {
        return this.observableToResult<T>(
            this.httpClient.post(`${environment.apiUrl}${url}`, body, {
                withCredentials: true,
            })
        );
    }

    protected makeSearchPaginationRequest<T>(
        url: string,
        userSearch: string,
        currentPage: number = 0,
        searchAmount: number = 10
    ) {
        return this.observableToResult<SearchResult<T>>(
            this.httpClient.post(
                `${environment.apiUrl}${url}`,
                {
                    userSearch: userSearch,
                    // Say we are on page 3 with a search amount of 5, so we
                    // need to skip 15 ahead and search five more.
                    skip: currentPage * searchAmount,
                    take: searchAmount,
                },
                {
                    withCredentials: true,
                }
            )
        );
    }

    protected async observableToResult<T>(
        observable: Observable<any>
    ): Promise<Result<T, Error>> {
        try {
            return Ok(await lastValueFrom(observable));
        } catch (error: any) {
            return Err(error);
        }
    }
}

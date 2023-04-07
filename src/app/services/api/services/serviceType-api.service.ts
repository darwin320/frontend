import { Injectable } from "@angular/core";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TypeService } from "src/app/models/typeService";

@Injectable({
    providedIn: "root",
})
export class ServicesApiServiceType
    extends ApiService
    implements ApiWithSearch<TypeService>
    
{
    private typeServices: string[] = [];

    public getTypeServices(): string[] {
        return this.typeServices;
    }
    

    search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<TypeService>> {
       
        return from(
            this.getServices(userSearch, currentSearchPage, searchLimit)
        );
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }


    public async getServices(
        userSearch: string,
        currentPage: number,
        searchAmount: number
    ): Promise<SearchResult<TypeService>> {
        const result = await this.makeSearchPaginationRequest<TypeService>(
            "/services/typeservices",
            userSearch,
            currentPage,
            searchAmount
        );
        this.typeServices = result.unwrap().search.map((typeService: TypeService) => typeService.toString());
        return result.unwrap();
    }

    
        
}
import { Injectable } from "@angular/core";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Service } from "src/app/models/service";
import { TypeService } from "src/app/models/typeService";

@Injectable({
    providedIn: "root",
})
export class ServicesApiService
    extends ApiService
    implements ApiWithSearch<Service>
    
{
    


    private typeServices: string[] = [];

    public getTypeServicesList(): string[] {
    return this.typeServices;
    }
    search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<Service>> {
       
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
    ): Promise<SearchResult<Service>> {
        const result = await this.makeSearchPaginationRequest<Service>(
            "/services/search",
            userSearch,
            currentPage,
            searchAmount
        );
        const result2 = await this.makeSimplePostRequest<TypeService>(
            "/services/typeservices",
            userSearch
        );
      //  this.typeServices = result2.unwrap().search.map((typeService: TypeService) => typeService.toString());
       // this.typeServices = result2.val(typeService => typeService.name);;
       if (Array.isArray(result2.val)) {
        for (const service of result2.val) {
            this.typeServices.push(service);
          }
      } else {
        // handle error here
      }

     

        return result.unwrap();
    }

    public createService(serviceInformation: {
        nameService: string;
        typeService: string;
        nameSupplier: string;
        company: string;
        phoneNumber: string;
        description: string;
        value: number;
    }) {
        return this.makeSimplePostRequest(
            "/services/create",
            serviceInformation
        );
    }

    public getService(serviceId: number) {
        return this.makeSimpleGetRequest<Service>(`/services/${serviceId}`);
    }

    public updateService(updateService: Service) {
        return this.observableToResult(
            this.httpClient.put(
                `${environment.apiUrl}/services/update/${updateService.id}`,
                updateService,
                {
                    withCredentials: true,
                }
            )
        );
    }

    public deleteService(serviceId: number) {
        return this.observableToResult(
            this.httpClient.delete(
                `${environment.apiUrl}/services/delete/${serviceId}`,
                {
                    withCredentials: true,
                    responseType: "text",
                }
            )
        );
    }
}

import { Injectable } from "@angular/core";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";

//INTERFACES

import { Reservation } from "src/app/models/reservation";
import { TypeSalon } from "src/app/models/typeSalon";
import { TypeEvent } from "src/app/models/typeEvent";

@Injectable({
    providedIn: "root",
}) 
export class ReservationsApiService 
extends ApiService
implements ApiWithSearch<Reservation>
{
    search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<Reservation>> {
       
        return from(
            this.getReservations(userSearch, currentSearchPage, searchLimit)
        );
    }
  

    private TypeRoom : string[] = [];
    private TypeEvent :string[] = [];

    public getTypeRoom(): string[] {
        return this.TypeRoom;
    }

    public getTypeEvent(): string[] {
        return this.TypeEvent;
    }

    public async getReservations(
        userSearch: string,
        currentPage: number,
        searchAmount: number
    ): Promise<SearchResult<Reservation>> {
        const result = await this.makeSearchPaginationRequest<Reservation>(
            "/reservations/search",
            userSearch,
            currentPage,
            searchAmount
        );
        const result2 = await this.makeSimplePostRequest<TypeSalon>(
            "/reservations/typeSalon",
            userSearch
        );

        const result3 = await this.makeSimplePostRequest<TypeEvent>(
            "/reservations/typeEvent",
            userSearch
        );
      //  this.typeServices = result2.unwrap().search.map((typeService: TypeService) => typeService.toString());
       // this.typeServices = result2.val(typeService => typeService.name);;
       if (Array.isArray(result2.val) && Array.isArray(result3.val)) {
        for (const service of result2.val) {
            this.TypeRoom.push(service);
          }
          for (const service of result3.val) {
            this.TypeEvent.push(service);
          }
      } else {
        // handle error here
      }

     

        return result.unwrap();
    }

    
    public getReservation(reservationId: number) {
        return this.makeSimpleGetRequest<Reservation>(`/reservations/${reservationId}`);
    }


    public createrReservation(reservationInformation: {
        idUser:number;
        nameClient: string;
        salon: string;
        cantidadAdultos: number;
        cantidadNinos: number;
        fecha: string;
        horaInicio: Date;
        horaFin: Date;
        tipoEvento: string;
        downPayment: number;
        priceRoomPerHour: number;
    }) {
        return this.makeSimplePostRequest(
            "/reservations/create",
            reservationInformation
        );
    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}
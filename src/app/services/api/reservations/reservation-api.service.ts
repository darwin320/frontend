import { Injectable } from "@angular/core";
import { ApiService, ApiWithSearch } from "../api.service";
import { SearchResult } from "../apiTypes";

import { from, Observable } from "rxjs";
import { environment } from "src/environments/environment";

//INTERFACES

import { Reservation } from "src/app/models/reservation";
import { TypeSalon } from "src/app/models/typeSalon";
import { TypeEvent } from "src/app/models/typeEvent";
import { Service } from "src/app/models/service";
import { Inventory } from "src/app/models/inventory";



@Injectable({
    providedIn: "root",
}) 
export class ReservationsApiService 
extends ApiService
implements ApiWithSearch<Reservation>
{

    private TypeRoom : string[] = [];
    private TypeEvent :string[] = [];

    public getTypeRoom(): string[] {
        return this.TypeRoom;
    }

    public getTypeEvent(): string[] {
        return this.TypeEvent;
    }
    search(
        userSearch: string,
        currentSearchPage: number,
        searchLimit: number
    ): Observable<SearchResult<Reservation>> {
       
        return from(
            this.getReservations(userSearch, currentSearchPage, searchLimit)
        );
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


    public createReservation(reservationInformation: {
        idUser:number;
        nameClient: string;
        salon: string;
        cantidadAdultos: number;
        cantidadNinos: number;
        fecha: string;
        fechaFin: string;
        horaInicio: Date;
        horaFin: Date;
        tipoEvento: string;
        downPayment: number;
        priceRoomPerHour: number;
        inventory: Service[] | Inventory
    }) {
        return this.makeSimplePostRequest(
            "/reservations/create",
            reservationInformation
        );
    }

    public deleteReservation(reservationId: number) {
        return this.observableToResult(
            this.httpClient.delete(
                `${environment.apiUrl}/reservations/delete/${reservationId}`,
                {
                    withCredentials: true,
                    responseType: "text",
                }
            )
        );
    }

    public updateReservation(updateReservation: Reservation) {
       
        return this.observableToResult(
            this.httpClient.put(
                `${environment.apiUrl}/reservations/update/${updateReservation.id}`,
                updateReservation,
                {
                    withCredentials: true,
                }
            )
        );
    }

    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }



}
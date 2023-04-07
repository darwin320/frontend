import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Reservation } from "src/app/models/reservation";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";
@Component({
    selector: "app-show-service",
    templateUrl: "./show-reservation.component.html",
    styleUrls: ["./show-reservation.component.sass"],
})


export class ShowReservationComponent implements OnInit {

    public reservation!: Reservation;
    public rentRoom: number = 0;

    constructor(
        public reservationsApiService: ReservationsApiService ,
        private mainLoaderService: MainLoaderService,
        private route: ActivatedRoute
    ){
    }

    async ngOnInit() {
        this.mainLoaderService.doWithLoadingScreen(async () => {
            const result = await this.reservationsApiService.getReservation(
                
                this.route.snapshot.params["reservationId"]
            );

            if (result.ok) {
               
                this.reservation = result.val;
                this.calculateRentRoom()
            }
        });
    }

    calculateRentRoom(){
        const date1 = this.reservation.horaInicio;
        const date2 = this.reservation.horaFin;
        const date1oBJ = new Date(date1);
        const date2oBJ = new Date(date2);
        const diffInMs =  Number(date2oBJ) - Number(date1oBJ);
        
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        this.rentRoom = diffInHours*this.reservation.priceRoomPerHour;

    }
    openEditUserModal() {

    }

    openDeleteUserModal() {

    }



}
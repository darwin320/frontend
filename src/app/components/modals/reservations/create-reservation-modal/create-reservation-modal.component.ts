import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";
import { Err, Ok } from "ts-results";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";



@Component({
    selector: "app-create-reservation-modal",
    templateUrl: "./create-reservation-modal.component.html",
    styleUrls: ["./create-reservation-modal.component.sass"],
})
 export class CreateReservationModal{
    public reservationForm = new FormGroup({
        nameClient: new FormControl<string>("", [Validators.required]),
        salon: new FormControl<string>("", [Validators.required]),
        cantidadAdultos: new FormControl<number>(0, [Validators.required]),
        cantidadNinos: new FormControl<number>(0, [Validators.required]),
        fecha: new FormControl<Date>(new Date(), [Validators.required]),
        horaInicio: new FormControl<Date>(new Date(), [Validators.required]),
        horaFin: new FormControl<Date>(new Date(), [Validators.required]),
        tipoEvento: new FormControl<string>("", [Validators.required]),
        downPayment : new FormControl<number>(0, [Validators.required]),
        priceRoomPerHour: new FormControl<number>(0, [Validators.required]),
    });

    constructor(
        public activeModal: NgbActiveModal,
        private loaderService: MainLoaderService,
        private reservationApiService: ReservationsApiService
    ){}

    public createReservation(){
        
    }
 }

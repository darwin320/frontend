import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { DeleteReservationModalComponent } from "src/app/components/modals/reservations/delete-reservation-modal/delete-reservation-modal.component";
import { EditReservationModal } from "src/app/components/modals/reservations/edit-reservation-modal/edit-reservation.modal.component";
import { SelectServiceModalComponent } from "src/app/components/modals/services/select-service-modal/select-service-modal.component";
import { Reservation } from "src/app/models/reservation";
import { Service } from "src/app/models/service";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";
@Component({
    selector: "app-show-service",
    templateUrl: "./show-reservation-bill.component.html",
    styleUrls: ["./show-reservation-bill.component.css"],
})


export class ShowReservationBillComponent implements OnInit {

    public reservation!: Reservation;
    public rentRoom: number = 0;

    constructor(
        public reservationsApiService: ReservationsApiService ,
        private mainLoaderService: MainLoaderService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
    ){

        

    }

    public serviesOwnReservation: Service[]=[];

    async ngOnInit() {
        this.mainLoaderService.doWithLoadingScreen(async () => {
            const result = await this.reservationsApiService.getReservation(
                
                this.route.snapshot.params["reservationId"]
            );


            if (result.ok) {
              
                this.reservation = result.val;
                
                this.serviesOwnReservation = this.reservation.inventario.servicios;
                this.calculateRentRoom()
            }
        });
    }

    public calculateRentRoom(){
        const date1 = this.reservation.horaInicio;
        const date2 = this.reservation.horaFin;
        const date1oBJ = new Date(date1);
        const date2oBJ = new Date(date2);
        const diffInMs =  Number(date2oBJ) - Number(date1oBJ);
        
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        this.rentRoom = diffInHours*this.reservation.priceRoomPerHour;
    }
    public openEditUserModal() {
        this.modalService.open(EditReservationModal, {
            centered: true,
            size: "lg",
            injector: Injector.create({
                providers: [{ provide: Reservation, useValue: this.reservation }],
            }),
        });
    }

     public getTotalPrice(): number {
        return this.serviesOwnReservation.reduce((total, service) => total + (service.price ?? 0), 0);
      }

      public getTotalEarning(): number{
        return this.getTotalPrice() + this.rentRoom;
      }
      

    public openDeleteUserModal() {
        this.modalService.open(DeleteReservationModalComponent, {
            centered: true,

            injector: Injector.create({
                providers: [{ provide: Reservation, useValue: this.reservation }],
            }),
        });
    }

    public openDetailsService(service:Service){
        const modalRef = this.modalService.open(SelectServiceModalComponent, {
            centered: true,
            size: "lg",
        }) 
        modalRef.componentInstance.validatorSelector = false;
        modalRef.componentInstance.editServiceButton = false;
        modalRef.componentInstance.validatorDescription = true;
        modalRef.componentInstance.service = service;
        modalRef.componentInstance.setterProperties(service);
    }



}
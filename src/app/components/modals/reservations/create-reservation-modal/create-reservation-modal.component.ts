import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";
import { Err, Ok } from "ts-results";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";

import { ActivatedRoute } from "@angular/router";
import { UsersApiService } from "src/app/services/api/users/users-api.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-create-reservation-modal",
    templateUrl: "./create-reservation-modal.component.html",
    styleUrls: ["./create-reservation-modal.component.sass"],
})
 export class CreateReservationModal{
    public reservationForm = new FormGroup({
        nameClient: new FormControl<string>("", [Validators.required]),
        salon: new FormControl<string>("", [Validators.required]),
        cantidadAdultos: new FormControl<number>(0, [Validators.required,
        Validators.pattern("[0-9]*"),]),
        cantidadNinos: new FormControl<number>(0, [Validators.required,
        Validators.pattern("[0-9]*")]),
        fecha: new FormControl<string>("", [Validators.required]),
        horaInicio: new FormControl<Date>(new Date(), [Validators.required]),
        horaFin: new FormControl<Date>(new Date()   , [Validators.required]),
        tipoEvento: new FormControl<string>("", [Validators.required]),
        downPayment : new FormControl<number>(0, [Validators.required]),
        priceRoomPerHour: new FormControl<number>(0, [Validators.required]),
    });
    
    constructor(
        private route: ActivatedRoute,
        public activeModal: NgbActiveModal,
        private loaderService: MainLoaderService,
        private reservationApiService: ReservationsApiService,
        private usersApiService: UsersApiService,
        private mainLoaderService: MainLoaderService,
        private message : ToastrService,
        
        
    ){}
    public typeRoom: string[] = this.reservationApiService.getTypeRoom(); // agregar propiedad aquí
    public typeEvent: string[] = this.reservationApiService.getTypeEvent(); // agregar propiedad aquí

    public async createReservation(){
        let startHour: string | Date | null = null;
        let endHour: string | Date | null = null;


        

        let idUser = 0;
        
        const result = await this.usersApiService.getCurrentUser()
              if ('id' in result.val) {
                idUser = result.val.id;
              }
      

        startHour = this.convertDate(this.reservationForm.value!.fecha,this.reservationForm!.value.horaInicio);
        endHour = this.convertDate(this.reservationForm.value!.fecha,this.reservationForm!.value.horaFin);

        await this.loaderService.doWithLoadingScreen(async () => {
            
            try {
                
                await this.reservationApiService.createrReservation({
                    idUser : idUser,
                    nameClient: this.reservationForm.value!.nameClient as string,
                    salon: this.reservationForm.value!.salon as string,
                    cantidadAdultos: Number(this.reservationForm.value!.cantidadAdultos),
                    cantidadNinos: Number(this.reservationForm.value!.cantidadNinos),
                    fecha: this.reservationForm.value!.fecha as string,
                    horaInicio: startHour as Date,
                    horaFin: endHour as Date,
                    tipoEvento: this.reservationForm.value.tipoEvento! as string,
                    downPayment: Number(this.reservationForm.value!.downPayment),
                    priceRoomPerHour: Number(this.reservationForm.value!.priceRoomPerHour)
                });
                this.activeModal.close();
                this.message.success("La reservación Ha Sido Creada Correctamente")
                return Ok({
                    header: "Servicio creado",
                    body: "Se ha creado el servicio correctamente.",
                });
                
            } catch (error: any) {
                return Err(error);
            }

            
        });

   
      
        

    }

    private convertDate (fechaString: any, hourString:any){
        const fechaCompletaString = fechaString.concat('T', hourString, ':00.000Z');
        const fechaCompleta = new Date(fechaCompletaString);
        const isoFechaCompleta = fechaCompleta.toISOString();
        return isoFechaCompleta;
    }
 }

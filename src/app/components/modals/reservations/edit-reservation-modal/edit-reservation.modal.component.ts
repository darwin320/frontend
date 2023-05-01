import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";
import { Err, Ok } from "ts-results";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";

import { UsersApiService } from "src/app/services/api/users/users-api.service";
import { ToastrService } from "ngx-toastr";
import { Reservation } from "src/app/models/reservation";
import { Router } from "@angular/router";
import { Service } from "src/app/models/service";
import { Inventory } from "src/app/models/inventory";
import { SelectServiceModalComponent } from "../../services/select-service-modal/select-service-modal.component";


@Component({
    selector: "app-edit-reservation-modal",
    templateUrl: "./edit-reservation-modal.component.html",
    styleUrls: ["./edit-reservation-modal.component.sass"],
})
 export class EditReservationModal{

    
    creatingReservation = true;
    showServices = false;
    public serviesOwnReservation: Service[] = this.reservation.inventario.servicios;

 
    
    constructor(
        private router: Router,
        public activeModal: NgbActiveModal,
        private loaderService: MainLoaderService,
        private reservationApiService: ReservationsApiService,
        private usersApiService: UsersApiService,
        private mainLoaderService: MainLoaderService,
        private message : ToastrService,
        private reservation :Reservation,
        private modalService: NgbModal

        
        
        
    ){
    }

    public reservationForm = new FormGroup(
        {
        nameClient: new FormControl<string>(this.reservation.nameClient, [Validators.required]),
        salon: new FormControl<string>(this.reservation.salon, [Validators.required]),
        cantidadAdultos: new FormControl<number>(this.reservation.cantidadAdultos, [Validators.required,
        Validators.pattern("[0-9]*"),]),
        cantidadNinos: new FormControl<number>(this.reservation.cantidadNinos, [Validators.required,
        Validators.pattern("[0-9]*")]),
        fecha: new FormControl<string>(this.reservation.fecha, [Validators.required]),
        fechaFin: new FormControl<string>(this.reservation.fechaFin, [Validators.required]),
        horaInicio: new FormControl<string>(this.convertDateToHour(this.reservation.horaInicio)   , [Validators.required]),
        horaFin: new FormControl<string>(this.convertDateToHour(this.reservation.horaFin)  , [Validators.required]),
        tipoEvento: new FormControl<string>(this.reservation.tipoEvento, [Validators.required]),
        downPayment : new FormControl<number>(this.reservation.downPayment, [Validators.required]),
        priceRoomPerHour: new FormControl<number>(this.reservation.priceRoomPerHour, [Validators.required]),

    });



    private convertDateToHour(date:Date){
        const fecha = new Date(date);
        const horaUTC = fecha.getUTCHours();
        const minutosUTC = fecha.getUTCMinutes();
        
        // Calculamos la hora local sumando o restando la diferencia horaria
        const diferenciaHoraria = 0; // Diferencia horaria con UTC en horas (-5 para America/Lima)
        const horaLocal = horaUTC + diferenciaHoraria;
        const minutosLocal = minutosUTC;
        
        // Formateamos la hora y los minutos como una cadena "hh:mm"
        const horaCompleta = horaLocal.toString().padStart(2, "0") + ":" + minutosLocal.toString().padStart(2, "0");
        return horaCompleta;
    }
    refreshPage() {
        setTimeout(() => {
            window.location.reload();
          }, 1600);
    }
    public typeRoom: string[] = this.reservationApiService.getTypeRoom(); // agregar propiedad aquí
    public typeEvent: string[] = this.reservationApiService.getTypeEvent(); // agregar propiedad aquí
    public inventory: Inventory = new Inventory(this.reservation.inventario.id,this.reservation.id,this.serviesOwnReservation) ;
    public async editReservation(){
  


        let idUser = 0;
        
        const result = await this.usersApiService.getCurrentUser()
              if ('id' in result.val) {
                idUser = result.val.id;
              }
      
              let startHour: string | Date | null = null;
              let endHour: string | Date | null = null;
        startHour = this.convertDate(this.reservationForm.value!.fecha,this.reservationForm!.value.horaInicio);
        endHour = this.convertDate(this.reservationForm.value!.fechaFin,this.reservationForm!.value.horaFin);
        
        

        if(startHour!=null && endHour!=null){
            if (new Date(startHour) > new Date(endHour)) {
                this.message.warning("La fecha de reservación inicial no puede ser menor a la de reservación final")
                }else{
                    await this.loaderService.doWithLoadingScreen(async () => {
     
                        try {
                            
                            await this.reservationApiService.updateReservation({
                                id: this.reservation.id,
                                idUser: idUser,
                                nameClient: this.reservationForm.value!.nameClient as string,
                                salon: this.reservationForm.value!.salon as string,
                                cantidadAdultos: Number(this.reservationForm.value!.cantidadAdultos),
                                cantidadNinos: Number(this.reservationForm.value!.cantidadNinos),
                                fecha: this.reservationForm.value!.fecha as string,
                                fechaFin: this.reservationForm.value!.fechaFin as string,
                                horaInicio: startHour as Date,
                                horaFin: endHour as Date,
                                tipoEvento: this.reservationForm.value.tipoEvento! as string,
                                downPayment: Number(this.reservationForm.value!.downPayment),
                                priceRoomPerHour: Number(this.reservationForm.value!.priceRoomPerHour),
                                inventario:this.inventory as Inventory,
                              //  services: this.serviesOwnReservation
                            });
                            return Ok({
                                header: "Reservación actualizada correctamente",
                                body: "Se ha creado el servicio correctamente.",
                            });
                            
                        } catch (error: any) {
                            return Err(error);
                        }
            
                        
                    });
                    this.activeModal.close();
                    this.message.success("Reservación actualizada correctamentee")
                    this.router.navigate(["reservations"]);
                }
            }

      

   
      
        

    }

 

    createReservationValidator() {
        this.showServices = false;
        this.creatingReservation = true;
        
    }

    public editServiceOwnReservation(service:Service){
        const modalRef = this.modalService.open(SelectServiceModalComponent, {
            centered: true,
            size: "lg",
        }) 
        modalRef.componentInstance.validatorSelector = false;
        modalRef.componentInstance.editServiceButton = false;
        modalRef.componentInstance.service = service;
    }
  
    public showDetailsService(service:Service){
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

    public agregateServiceToReservation(){
        
        this.modalService
        .open(SelectServiceModalComponent, {
            centered: true,
            size: "lg",
        })
        .result.then(
            (service:Service) =>{
                this.serviesOwnReservation.push(service);
            }
            
        )
    }
    
    public deleteServiceOwnReservation(service2: Service) {
        let idToDelete = service2.id; // Aquí debes obtener el id del servicio que quieres eliminar
        let indexToDelete = this.serviesOwnReservation.findIndex(service => service.id === idToDelete);
    
        if (indexToDelete !== -1) { // Verifica si el índice existe antes de eliminarlo
            this.serviesOwnReservation.splice(indexToDelete, 1); // El segundo parámetro en splice() es la cantidad de elementos a eliminar
        }
    }
    
   
    
    public servicesReservationValidator() {
        this.showServices = true;
        this.creatingReservation = false;
    }

    private convertDate (fechaString: any, hourString:any){
        const fechaCompletaString = fechaString.concat('T', hourString, ':00.000Z');
        const fechaCompleta = new Date(fechaCompletaString);
        const isoFechaCompleta = fechaCompleta.toISOString();
        return isoFechaCompleta;
    }
 }

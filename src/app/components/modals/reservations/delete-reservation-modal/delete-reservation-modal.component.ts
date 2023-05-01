import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/reservation";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";

@Component({
    selector: "app-delete-reservation-modal",
    templateUrl: "./delete-reservation-modal.component.html",
    styleUrls: ["./delete-reservation-modal.component.sass"],
})
export class DeleteReservationModalComponent {
    constructor(
        private reservationsApiService: ReservationsApiService,
        private loaderService: MainLoaderService,
        private reservation: Reservation,
        public activeModal: NgbActiveModal,
        private message : ToastrService,
        private router: Router,
    ) {}

    public async deleteReservation() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.reservationsApiService.deleteReservation(this.reservation.id);
                
                this.message.success("La reservación Ha Sido Eliminada Correctamente")
                this.router.navigate(["reservations"]);
                return Ok({
                    header: "Reservación Eliminada",
                    body: "Se ha eliminado La reservación correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

        this.activeModal.close();
    }
}

import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/reservation";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";

@Component({
  selector: 'app-check-out-reservation-modal',
  templateUrl: './check-out-reservation-modal.component.html',
  styleUrls: ['./check-out-reservation-modal.component.css']
})
export class CheckOutReservationModalComponent {
  constructor(
    private reservationsApiService: ReservationsApiService,
    private loaderService: MainLoaderService,
    private reservation: Reservation,
    public activeModal: NgbActiveModal,
    private message : ToastrService,
    private router: Router,
) {}

public async checkOutReservation() {
    await this.loaderService.doWithLoadingScreen(async () => {
        try {
            await this.reservationsApiService.deleteCheckout(this.reservation.id);
            
            this.message.success("Se ha realizado el checkout correctamente")
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

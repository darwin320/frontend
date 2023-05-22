import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsApiService } from 'src/app/services/api/reservations/reservation-api.service';
import { CreateReservationModal } from '../../modals/reservations/create-reservation-modal/create-reservation-modal.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  constructor(
    public reservationsApiService: ReservationsApiService ,

    private modalService: NgbModal
) {
}



public openCreateReservationModal(){
    this.modalService.open(CreateReservationModal,{
        size: 'lg',
    });
}
}

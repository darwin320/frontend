import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";

@Component({
    selector: "app-select-service-modal",
    templateUrl: "./select-service-modal.component.html",
    styleUrls: ["./select-service-modal.component.sass"],
})
export class SelectServiceModalComponent {
    constructor(
        public servicesApiService: ServicesApiService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal
    ) {}

    public selectService(service: Service) {
        this.activeModal.close(service);
    }
}

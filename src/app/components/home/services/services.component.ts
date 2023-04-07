import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateServiceModalComponent } from "src/app/components/modals/services/create-service-modal/create-service-modal.component";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";

@Component({
    selector: "app-services",
    templateUrl: "./services.component.html",
    styleUrls: ["./services.component.sass"],
})
export class ServicesComponent {
    services: any = [];

    constructor(
        public servicesApiService: ServicesApiService,

        private modalService: NgbModal
    ) {}

    public openCreateServiceModal() {
        this.modalService.open(CreateServiceModalComponent, {
            centered: true,
        });
    }
}

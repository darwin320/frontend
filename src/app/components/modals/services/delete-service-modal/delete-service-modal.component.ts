import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-delete-service-modal",
    templateUrl: "./delete-service-modal.component.html",
    styleUrls: ["./delete-service-modal.component.sass"],
})
export class DeleteServiceModalComponent {
    constructor(
        private servicesApiService: ServicesApiService,
        private loaderService: MainLoaderService,
        private service: Service,
        public activeModal: NgbActiveModal,
        private message : ToastrService,
        private router: Router,
    ) {}

    public async deleteService() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.servicesApiService.deleteService(this.service.id);
                this.message.success("El servicio Ha Sido Eliminado Correctamente")
                this.router.navigate(["services"]);
                return Ok({
                    header: "Servicio Eliminado",
                    body: "Se ha eliminado el servicio correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

        this.activeModal.close();
    }
}

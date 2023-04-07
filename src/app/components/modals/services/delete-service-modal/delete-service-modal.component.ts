import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";

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
        public activeModal: NgbActiveModal
    ) {}

    public async deleteService() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.servicesApiService.deleteService(this.service.id);
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

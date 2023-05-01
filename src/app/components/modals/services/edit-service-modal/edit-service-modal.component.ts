import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { ToastGeneratorService } from "src/app/components/toasts/toast-generator.service";
import { Err, Ok } from "ts-results";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-edit-service-modal",
    templateUrl: "./edit-service-modal.component.html",
    styleUrls: ["./edit-service-modal.component.sass"],
})
export class EditServiceModalComponent {
    public serviceForm = new FormGroup({
        nameService: new FormControl<string>(this.service.nameService, [Validators.required]),
        typeService: new FormControl<string>(this.service.typeService, [Validators.required]),
        nameSupplier: new FormControl<string>(this.service.nameSupplier, [Validators.required]),
        company: new FormControl<string>(this.service.company, [Validators.required]),
        phoneNumber: new FormControl<string>(this.service.phoneNumber, [
            Validators.required
           // Validators.pattern("[0-9]*"), // Asegura que sólo se ingresen números
        ]),
        description: new FormControl<string>(this.service.description, [
            Validators.required,
        ]),
    });

    constructor(
        public modalService: NgbModal,
        public activeModal: NgbActiveModal,

        private servicesApiService: ServicesApiService,
        private service: Service,
        private loaderService: MainLoaderService,
        private message : ToastrService,
        private router: Router
    ) {}
    public typeServices: string[] = this.servicesApiService.getTypeServicesList(); // agregar propiedad aquí

    public async editService() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                //ACA IBA UNA PARTE IMPORTANTE
                await this.servicesApiService.updateService({
                    id: this.service.id,
                    nameService: this.serviceForm.value!.nameService as string,
                    typeService: this.serviceForm.value!.typeService as string,
                    nameSupplier: this.serviceForm.value!.nameSupplier as string,
                    company: this.serviceForm.value!.company as string,
                    phoneNumber: this.serviceForm.value!.phoneNumber as string,
                    description: this.serviceForm.value!.description as string,

                });

                this.message.success("El servicio Ha Sido Actualizado Correctamente")
                this.router.navigate(["services"]);
                return Ok({
                    header: "Servicio editado",
                    body: "Se ha editado el servicio correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

        this.activeModal.close();
    }
}

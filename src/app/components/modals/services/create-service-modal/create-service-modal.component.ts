import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { ToastGeneratorService } from "src/app/components/toasts/toast-generator.service";
import { Err, Ok } from "ts-results";
import { ApiService } from "src/app/services/api/api.service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: "app-create-service-modal",
    templateUrl: "./create-service-modal.component.html",
    styleUrls: ["./create-service-modal.component.sass"],
})
export class CreateServiceModalComponent {
    public serviceForm = new FormGroup({
        nameService: new FormControl<string>("", [Validators.required]),
        typeService: new FormControl<string>("", [Validators.required]),
        nameSupplier: new FormControl<string>("", [Validators.required]),
        company: new FormControl<string>("", [Validators.required]),
        phoneNumber: new FormControl<string>("", [
            Validators.required,
            Validators.pattern("[0-9]*"), // Asegura que sólo se ingresen números
        ]),
        description: new FormControl<string>("", [Validators.required]),
        value: new FormControl<number>(0, [Validators.required]),
    });
    
    constructor(
        public activeModal: NgbActiveModal,

        private loaderService: MainLoaderService,
        private serviceApiService: ServicesApiService,
        private toastService: ToastGeneratorService,
        private apiService: ApiService,
        private message : ToastrService,
        private router: Router,
        private location: Location
    ) {
    }
    public typeServices: string[] = this.serviceApiService.getTypeServicesList(); // agregar propiedad aquí

    
    refreshPage() {
        setTimeout(() => {
            window.location.reload();
          }, 1600);
      }
      

    public async createService() {
        await this.loaderService.doWithLoadingScreen(async () => {
            
            try {
                
                await this.serviceApiService.createService({
                    nameService: this.serviceForm.value!.nameService as string,
                    typeService: this.serviceForm.value!.typeService as string,
                    nameSupplier: this.serviceForm.value!.nameSupplier as string,
                    company: this.serviceForm.value!.company as string,
                    phoneNumber: this.serviceForm.value!.phoneNumber as string,
                    description: this.serviceForm.value!.description as string,
                    value: this.serviceForm.value.value! as number,
                });
                this.message.success("El servicio Ha Sido Creado Correctamente")

                this.refreshPage()
                return Ok({
                    header: "Servicio creado",
                    body: "Se ha creado el servicio correctamente.",
                });
                
            } catch (error: any) {
                return Err(error);
            }
        });
        
        
        this.activeModal.close();
        
    }

    
}

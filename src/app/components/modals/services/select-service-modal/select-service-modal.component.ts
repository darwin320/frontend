import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { Err, Ok } from "ts-results";

@Component({
    selector: "app-select-service-modal",
    templateUrl: "./select-service-modal.component.html",
    styleUrls: ["./select-service-modal.component.sass"],
})
export class SelectServiceModalComponent {


    
    public serviceForm =  new FormGroup({

        nameService: new FormControl<string>("", [Validators.required]),
        typeService: new FormControl<string>("", [Validators.required]),
        nameSupplier: new FormControl<string>("", [Validators.required]),
        company: new FormControl<string>("", [Validators.required]),
        phoneNumber: new FormControl<string>("", [
            Validators.required,
            Validators.pattern("[0-9]*"), // Asegura que sólo se ingresen números
        ]),
        description: new FormControl<string>("", [
            Validators.required,
        ]),
        price: new FormControl<number>(0,[
            Validators.required,
        Validators.pattern("[0-9]*"),
        ]),
        earningsPer: new FormControl<number>(0,[
            Validators.required,
        Validators.pattern("[0-9]*"),
        ])
    });
    public setServiceSelected(service: Service){
        this.service = service;
    }

    public service!: Service;

    constructor(
        public servicesApiService: ServicesApiService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        private mainLoaderService: MainLoaderService,
        
        

    ) {}
    public validatorSelector = true;
    public  editServiceButton = true;
    public validatorDescription = false;
    public selectService(service: Service) {
        this.validatorSelector = false;
              
    }

    public async editServiceOFAnReser(service: Service) {
                service.description = this.serviceForm.value!.description as any;
                service.price = this.serviceForm.value!.price as any;
                service.earningsPer = this.serviceForm.value!.earningsPer as any;
                this.activeModal.close(service);        
    }

    


    public setterProperties(service: Service){
        this.serviceForm.controls.nameService.setValue(service.nameService);
        this.serviceForm.controls.typeService.setValue(service.typeService);
        this.serviceForm.controls.nameSupplier.setValue(service.nameSupplier);
        this.serviceForm.controls.company.setValue(service.company);
        this.serviceForm.controls.phoneNumber.setValue(service.phoneNumber);
        this.serviceForm.controls.description.setValue(service.description);
        this.serviceForm.controls.price.setValue(Number(service.price));
        this.serviceForm.controls.earningsPer.setValue(Number(service.earningsPer));
    }
    
}

import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteServiceModalComponent } from "src/app/components/modals/services/delete-service-modal/delete-service-modal.component";
import { EditServiceModalComponent } from "src/app/components/modals/services/edit-service-modal/edit-service-modal.component";
import { Service } from "src/app/models/service";
import { ServicesApiService } from "src/app/services/api/services/service-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";

@Component({
    selector: "app-show-service",
    templateUrl: "./show-service.component.html",
    styleUrls: ["./show-service.component.sass"],
})
export class ShowServiceComponent implements OnInit {
    public service!: Service;

    constructor(
        private route: ActivatedRoute,
        private servicesApiService: ServicesApiService,
        private modalService: NgbModal,
        private mainLoaderService: MainLoaderService
    ) {}

    async ngOnInit() {
        this.mainLoaderService.doWithLoadingScreen(async () => {
            const result = await this.servicesApiService.getService(
                this.route.snapshot.params["serviceId"]
            );

            if (result.ok) {
                this.service = result.val;
            }
        });
    }

    public openEditServiceModal() {
        this.modalService.open(EditServiceModalComponent, {
            centered: true,

            injector: Injector.create({
                providers: [{ provide: Service, useValue: this.service }],
            }),
        });
    }

    public openDeleteServiceModal() {
        this.modalService.open(DeleteServiceModalComponent, {
            centered: true,

            injector: Injector.create({
                providers: [{ provide: Service, useValue: this.service }],
            }),
        });
    }
}

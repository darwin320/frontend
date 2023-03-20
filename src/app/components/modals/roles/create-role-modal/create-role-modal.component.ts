import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RolesApiService } from "src/app/services/api/roles/roles-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";

@Component({
    selector: "app-create-role-modal",
    templateUrl: "./create-role-modal.component.html",
    styleUrls: ["./create-role-modal.component.css"],
})
export class CreateRoleModalComponent {
    public roleForm = new FormGroup({
        name: new FormControl<string>("Nuevo rol", [Validators.required]),
    });

    constructor(
        public activeModal: NgbActiveModal,

        private rolesApiService: RolesApiService,
        private mainLoaderService: MainLoaderService
    ) {}

    public async createRole() {
        if (this.roleForm.valid) {
            await this.mainLoaderService.doWithLoadingScreen(async () => {
                try {
                    await this.rolesApiService.createRole(
                        this.roleForm.value.name!
                    );
                    return Ok({
                        header: "Rol creado",
                        body: "Se ha creado el rol correctamente.",
                    });
                } catch (error: any) {
                    return Err(error);
                }
            });

            this.activeModal.close();
        }
    }
}

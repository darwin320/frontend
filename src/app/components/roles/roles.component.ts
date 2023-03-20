import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateRoleModalComponent } from "src/app/components/modals/roles/create-role-modal/create-role-modal.component";
import { RolesApiService } from "src/app/services/api/roles/roles-api.service";

@Component({
    selector: "app-roles",
    templateUrl: "./roles.component.html",
    styleUrls: ["./roles.component.css"],
})
export class RolesComponent {
    public readonly ROLE_SEARCH_LIMIT = 5;

    constructor(
        public rolesApiService: RolesApiService,
        private modalService: NgbModal
    ) {}

    public showCreateRoleModal() {
        this.modalService.open(CreateRoleModalComponent, {
            centered: true,
        });
    }
}

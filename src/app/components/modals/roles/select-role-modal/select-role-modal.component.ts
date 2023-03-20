import { Component } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Role } from "src/app/models/role";
import { RolesApiService } from "src/app/services/api/roles/roles-api.service";

@Component({
    selector: "app-select-role-modal",
    templateUrl: "./select-role-modal.component.html",
    styleUrls: ["./select-role-modal.component.sass"],
})
export class SelectRoleModalComponent {
    public readonly ROLE_SEARCH_LIMIT = 5;

    constructor(
        public rolesApiService: RolesApiService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal
    ) {}

    public selectRole(role: Role) {
        this.activeModal.close(role);
    }

    public closeAll() {
        this.modalService.dismissAll();
    }
}

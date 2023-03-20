import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Role } from "src/app/models/role";
import { User } from "src/app/models/user";
import { UsersApiService } from "src/app/services/api/users/users-api.service";
import { MainLoaderService } from "src/app//components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";
import { SelectRoleModalComponent } from "../../roles/select-role-modal/select-role-modal.component";

@Component({
    selector: "app-edit-user-modal",
    templateUrl: "./edit-user-modal.component.html",
    styleUrls: ["./edit-user-modal.component.sass"],
})
export class EditUserModalComponent {
    public userForm = new FormGroup({
        firstName: new FormControl<string>(this.user.firstName, [
            Validators.required,
        ]),
        lastName: new FormControl<string>(this.user.lastName, [
            Validators.required,
        ]),
        email: new FormControl<string>(this.user.email, [
            Validators.required,
            Validators.email,
        ]),
        role: new FormControl<Role>(this.user.role, {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    constructor(
        public modalService: NgbModal,
        public activeModal: NgbActiveModal,

        private user: User,
        private usersApiService: UsersApiService,
        private loaderService: MainLoaderService
    ) {}

    public openSelectRole() {
        this.modalService
            .open(SelectRoleModalComponent, {
                centered: true,
                size: "lg",
            })
            .result.then(
                (role: any) => {
                    if (role) {
                        this.userForm.value.role = role;
                    }
                },
                (_) => {}
            );
    }

    public async editUser() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.usersApiService.updateUser({
                    id: this.user.id,
                    firstName: this.userForm.value!.firstName as string,
                    lastName: this.userForm.value!.lastName as string,
                    role: this.userForm.value!.role as Role,
                    email: this.userForm.value!.email as string,
                });
                return Ok({
                    header: "Usuario editado",
                    body: "Se ha editado el usuario correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

        this.activeModal.close();
    }
}

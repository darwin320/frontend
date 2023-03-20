import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/models/user";
import { UsersApiService } from "src/app/services/api/users/users-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";

@Component({
    selector: "app-delete-user-modal",
    templateUrl: "./delete-user-modal.component.html",
    styleUrls: ["./delete-user-modal.component.sass"],
})
export class DeleteUserModalComponent {
    constructor(
        private usersApiService: UsersApiService,
        private loaderService: MainLoaderService,
        private user: User,
        public activeModal: NgbActiveModal
    ) {}

    public async deleteUser() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.usersApiService.deleteUser(this.user.id);
                return Ok({
                    header: "Usuario Eliminado",
                    body: "Se ha eliminado el usuario correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

        this.activeModal.close();
    }
}

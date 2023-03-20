import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteUserModalComponent } from "src/app/components/modals/users/delete-user-modal/delete-user-modal/delete-user-modal.component";
import { EditUserModalComponent } from "src/app/components/modals/users/edit-user-modal/edit-user-modal.component";
import { User } from "src/app/models/user";
import { UsersApiService } from "src/app/services/api/users/users-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";

@Component({
    selector: "app-show-user",
    templateUrl: "./show-user.component.html",
    styleUrls: ["./show-user.component.sass"],
})
export class ShowUserComponent implements OnInit {
    public user!: User;

    constructor(
        private route: ActivatedRoute,
        private usersApiService: UsersApiService,
        private modalService: NgbModal,
        private mainLoaderService: MainLoaderService
    ) {}

    async ngOnInit() {
        this.mainLoaderService.doWithLoadingScreen(async () => {
            const result = await this.usersApiService.getUser(
                this.route.snapshot.params["userId"]
            );
            if (result.ok) {
                this.user = result.val;
            }
        });
    }

    openEditUserModal() {
        this.modalService.open(EditUserModalComponent, {
            centered: true,

            // This is very important, as this is sort of seen in the documentation
            // we need to use the injector to inject information before the render
            // of the information.
            //
            // See: https://github.com/ng-bootstrap/ng-bootstrap/issues/2645
            injector: Injector.create({
                providers: [{ provide: User, useValue: this.user }],
            }),
        });
    }

    openDeleteUserModal() {
        this.modalService.open(DeleteUserModalComponent, {
            centered: true,

            injector: Injector.create({
                providers: [{ provide: User, useValue: this.user }],
            }),
        });
    }
}

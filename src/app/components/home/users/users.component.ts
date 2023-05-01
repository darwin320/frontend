import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateUserModalComponent } from "src/app/components/modals/users/create-user-modal/create-user-modal.component";
import { UsersApiService } from "src/app/services/api/users/users-api.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.sass"],
})
export class UsersComponent {
    // This constant is used to determine the amount of users searched.
    public readonly USER_SEARCH_LIMIT = 5;

    constructor(
        public usersApiService: UsersApiService,
        private modalService: NgbModal,
        
    ) {}

    public openCreateUserModal() {
       
        const modal = this.modalService.open(CreateUserModalComponent, {
            centered: true,
        });
        modal.closed.subscribe((result: any) => {
        });
    }

    
}

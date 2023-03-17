import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveOffcanvas } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: "app-main-sidebar",
    templateUrl: "./main-sidebar.component.html",
    styleUrls: ["./main-sidebar.component.sass"],
})
export class MainSidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private authService: AuthService,
        private router: Router
    ) {}

    public async logout() {
        if (await this.authService.logout()) {
            this.router.navigate(["/login"]);
        }
    }
}

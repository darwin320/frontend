import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbActiveOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { ReservationsApiService } from "src/app/services/api/reservations/reservation-api.service";

import { AuthService } from "src/app/services/auth/auth.service";
import { MainLoaderService } from "../../loaders/main-loader.service";
import { Reservation } from "src/app/models/reservation";
import { ToastrService } from "ngx-toastr";
import { Err, Ok } from "ts-results";

@Component({
    selector: "app-main-sidebar",
    templateUrl: "./main-sidebar.component.html",
    styleUrls: ["./main-sidebar.component.css"],
})
export class MainSidebarComponent {
    constructor(
        public activeOffcanvas: NgbActiveOffcanvas,
        private authService: AuthService,
        private router: Router,
        private reservationsApiService: ReservationsApiService,
        private loaderService: MainLoaderService,
        private message : ToastrService,
    ) {}

    public async users() {
            this.router.navigate(["/users"]);
    }

    public async services() {
        this.router.navigate(["/services"]);
}

    public async home() {
        this.router.navigate(["home"]);
    }

    public async reservations() {
        this.router.navigate(["reservations"]);
    }

    public async bills() {
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.reservationsApiService.bills();
                this.router.navigate(["reservations2/bills"]);
                return Ok({
                    header: "Reservación Eliminada",
                    body: "Se ha eliminado La reservación correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });

    }


    public async logout() {
        if (await this.authService.logout()) {
            localStorage.removeItem('token');
            this.router.navigate(["/login"]);
        }
    }

    public async reports(){
        await this.loaderService.doWithLoadingScreen(async () => {
            try {
                await this.reservationsApiService.reports();
                this.router.navigate(["reservations2/reports"]);
                return Ok({
                    header: "Reservación Eliminada",
                    body: "Se ha eliminado La reservación correctamente.",
                });
            } catch (error: any) {
                return Err(error);
            }
        });
    }

    
}

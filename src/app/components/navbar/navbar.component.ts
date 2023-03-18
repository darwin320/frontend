import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/api/users/users-api.service';
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { MainSidebarComponent } from "../sidebars/main-sidebar/main-sidebar.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user!: User;

  constructor(
      private usersApiService: UsersApiService,
      private offcanvasService: NgbOffcanvas
  ) {}

  public openSidebar() {
      this.offcanvasService.open(MainSidebarComponent);
  }

  public async ngOnInit() {

  }


}

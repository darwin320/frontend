import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MODULOS
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

//COMPONENTES 




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { NvComponent } from './components/nv/nv.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './components/home/home/home.component';
import { UsersComponent } from './components/home/users/users.component';
import { CreateUserModalComponent } from './components/modals/users/create-user-modal/create-user-modal.component';
import { SelectRoleModalComponent } from './components/modals/roles/select-role-modal/select-role-modal.component';
import { ShowUserComponent } from './components/home/users/show-user/show-user.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "./services/api/api.service";
import { CommonModule } from '@angular/common';
import { SearchTableComponent } from "../app/components/search/search-table/search-table.component";
import { EditUserModalComponent } from './components/modals/users/edit-user-modal/edit-user-modal.component';
import { RolesComponent } from './components/roles/roles.component';
import { ShowRoleComponent } from './components/roles/show-role/show-role.component';
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { CreateRoleModalComponent } from './components/modals/roles/create-role-modal/create-role-modal.component';
import { ServicesComponent } from './components/home/services/services.component';
import { CreateServiceModalComponent } from './components/modals/services/create-service-modal/create-service-modal.component';
import { ShowServiceComponent } from './components/home/services/show-service/show-service.component';
import { EditServiceModalComponent } from './components/modals/services/edit-service-modal/edit-service-modal.component';
import { SelectServiceModalComponent } from './components/modals/services/select-service-modal/select-service-modal.component';
import { DeleteServiceModalComponent } from './components/modals/services/delete-service-modal/delete-service-modal.component';
import { ReservationsComponent } from './components/home/reservations/reservations.component';
import { ShowReservationComponent } from './components/home/reservations/show-reservation/show-reservation.component';
import { CreateReservationModal } from './components/modals/reservations/create-reservation-modal/create-reservation-modal.component';
import { DeleteReservationModalComponent } from './components/modals/reservations/delete-reservation-modal/delete-reservation-modal.component';
import { EditReservationModal } from './components/modals/reservations/edit-reservation-modal/edit-reservation.modal.component';
@NgModule({
  declarations: [
    ServicesComponent,
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    UsersComponent,
    SpinnerComponent,
    NvComponent,
    HomeComponent,
    SearchTableComponent,
    SelectRoleModalComponent,
    CreateUserModalComponent,
    EditServiceModalComponent,
    SelectServiceModalComponent,
    DeleteServiceModalComponent,
    ShowServiceComponent,
    ShowUserComponent,
    ShowReservationComponent,
    EditUserModalComponent,
    RolesComponent,
    CreateRoleModalComponent,
    CreateServiceModalComponent,
    ShowRoleComponent,
    ReservationsComponent,
    CreateReservationModal,
    DeleteReservationModalComponent,
    EditReservationModal
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi:true},
    ApiService, MainLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

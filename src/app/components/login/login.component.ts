import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/userValidate';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from '../../utils/auth.guard'
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";
import { Err, Ok } from "ts-results";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private authService: AuthService,
    private mainLoaderService: MainLoaderService) { }
  ngOnInit(): void {
  
  }
  async login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.mainLoaderService.doWithLoadingScreen(async () => {
        const result = await this.authService.login(email, password);
        if (result.ok) {
            this.router.navigate(["home"]);

            return Ok({
                header: "Bienvenido",
                body: "Bienvenido al sistema Claralia.",
            });
        } else {
            return Err({
                header: "Error de ingreso",
                body: "Ha ocurrido un error con el ingreso, revisa por favor el correo y contraseña.",
            });
        }
    });
}


}


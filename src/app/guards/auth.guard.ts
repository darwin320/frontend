import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.authService.canActivate().then((response) => {
            if (response) {
                return true;
            } else {
                this.router.navigate([""]);
                return false;
            }
        });
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}

import { HttpHeaderResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "../api/api.service";

@Injectable({
    providedIn: "root",
})
export class AuthService extends ApiService {
    async login(email: string, password: string) {
        return this.observableToResult(
            this.httpClient.post(
                `${environment.endpoint}/login/password`,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                    responseType: "text",
                }
            )
        );
    }

    async logout() {
        return this.observableToResult<boolean>(
            this.httpClient.post(
                `${environment.endpoint}/logout`,
                {},
                {
                    withCredentials: true,
                }
            )
        );
    }

    async canActivate() {

        return await this.observableToResult<string>(
            this.httpClient.get(`${environment.endpoint}/auth/canActivate`, {
                withCredentials: true,
                responseType: "text",
            })
        ).then((response) => {
            return response.ok && response.val === "OK";
        });
    }
}

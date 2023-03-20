import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Role } from "src/app/models/role";
import { RolesApiService } from "src/app/services/api/roles/roles-api.service";
import { MainLoaderService } from "src/app/components/loaders/main-loader.service";

@Component({
    selector: "app-show-role",
    templateUrl: "./show-role.component.html",
    styleUrls: ["./show-role.component.sass"],
})
export class ShowRoleComponent implements OnInit {
    public role!: Role & {
        apisOnRoles: {
            api: {
                name: string;
            };
            get: boolean;
            post: boolean;
            delete: boolean;
        }[];
    };

    constructor(
        private route: ActivatedRoute,
        private rolesApiService: RolesApiService,
        private mainLoaderService: MainLoaderService
    ) {}

    async ngOnInit() {
        this.load();
    }

    public async updateRolePermissions() {
        this.mainLoaderService.doWithLoadingScreen(async () => {
            await this.rolesApiService.updateApisOnRoles(this.role.apisOnRoles);
        });

        this.load();
    }

    private async load() {
        const result = await this.rolesApiService.getRole(
            this.route.snapshot.params["roleId"]
        );

        if (result.ok) {
            this.role = result.val;
        }
    }
}

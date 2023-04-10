import { HttpErrorResponse } from "@angular/common/http";
import {
    ApplicationRef,
    ComponentRef,
    createComponent,
    EnvironmentInjector,
    Injectable,
} from "@angular/core";
import { LoaderComponent } from "src/app/components/loaders/loader/loader.component";
import { Result } from "ts-results";
import {
    ToastGeneratorService,
    ToastMessage,
} from "../toasts/toast-generator.service";

@Injectable({
    providedIn: "root",
})
export class MainLoaderService {
    private loadingScreenNode: any | null = null;
    private loaderComponent: ComponentRef<LoaderComponent> | null = null;

    constructor(
        private applicationRef: ApplicationRef,
        private injector: EnvironmentInjector,
        private toastService: ToastGeneratorService,
       
    ) {}

    public async doWithLoadingScreen(
        callback: () => Promise<Result<ToastMessage, ToastMessage> | void>
    ) {
        this.createLoadingScreen();

        const result = await callback();
        // Check that the result is not a void.
        if (result) {
            if (result.ok) {
                this.toastService.showMessage(result.val);
                
            } else {
                this.toastService.showError(result.val);
            }
        }

        this.removeLoadingScreen();
    }

    private createLoadingScreen() {
        if (this.loadingScreenNode === null) {
            this.loaderComponent = createComponent(LoaderComponent, {
                environmentInjector: this.applicationRef.injector,
                elementInjector: this.injector,
            });

            this.loadingScreenNode = document.body.appendChild(
                this.loaderComponent.location.nativeElement
            );
            this.applicationRef.attachView(this.loaderComponent.hostView);
        }
    }

    private removeLoadingScreen() {
        if (this.loadingScreenNode) {
            document.body.removeChild(this.loadingScreenNode);
            this.loadingScreenNode = null;
        }

        if (this.loaderComponent) {
            this.applicationRef.detachView(this.loaderComponent.hostView);
            this.loaderComponent = null;
        }
    }
}

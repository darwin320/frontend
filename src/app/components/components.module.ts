import { NgModule } from "@angular/core";
import { NavbarComponent } from "../components/navbar/navbar.component";


import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ShowUserComponent } from "./home/users/show-user/show-user.component";
import { UsersComponent } from "./home/users/users.component";



@NgModule({
    declarations: [
        NavbarComponent,
       
        
        
        
     
       
        
        
        
    ],
    exports: [
        CommonModule,
        
    ],

    imports: [
        FormsModule,
        NgbModule,
        CommonModule,
    ]
})
export class ComponentsModule {}
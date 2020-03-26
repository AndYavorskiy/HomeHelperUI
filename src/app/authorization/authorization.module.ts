import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { LoginComponent } from "./login.component";
import { AuthorizationService } from "./services";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthorizationRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthorizationService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthorizationModule { }

import { ReactiveFormsModule } from "@angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CompletePurchase, BasketComponent, BasketCreateComponent } from "./components";
import { BasketRoutingModule } from "./basket-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BasketRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        CompletePurchase
    ],
    declarations: [
        BasketComponent,
        CompletePurchase,
        BasketCreateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BasketModule {
}

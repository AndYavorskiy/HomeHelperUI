import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { FoodRoutingModule } from "./food-routing.module";
import { FoodDetailsComponent, FoodCreateComponent, FoodComponent, BuyFoodComponent } from "./components";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FoodRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        BuyFoodComponent
    ],
    declarations: [
        FoodComponent,
        FoodDetailsComponent,
        FoodCreateComponent,
        BuyFoodComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FoodModule { }

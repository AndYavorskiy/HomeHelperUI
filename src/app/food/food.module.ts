import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { FoodRoutingModule } from "./food-routing.module";
import { FoodComponent } from "./components/food.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FoodRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        FoodComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FoodModule { }
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FoodComponent } from "./components/food.component";
import { FoodDetailsComponent, FoodCreateComponent } from "./components";

const routes: Routes = [
    { path: "", component: FoodComponent },
    { path: "create", component: FoodCreateComponent },
    { path: ":id", component: FoodDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FoodRoutingModule { }

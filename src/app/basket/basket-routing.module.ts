import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BasketComponent, BasketCreateComponent } from "./components";

const routes: Routes = [
    { path: "", component: BasketComponent },
    { path: "create", component: BasketCreateComponent },
    { path: "update/:id", component: BasketCreateComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BasketRoutingModule { }

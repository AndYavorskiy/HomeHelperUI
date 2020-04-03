import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./shared/guards";

const routes: Routes = [
    { path: "", redirectTo: "/basket", pathMatch: "full" },
    { path: "auth", loadChildren: () => import("~/app/authorization/authorization.module").then((m) => m.AuthorizationModule) },
    { path: "basket", loadChildren: () => import("~/app/basket/basket.module").then((m) => m.BasketModule), canActivate: [AuthGuard] },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule), canActivate: [AuthGuard] },
    { path: "food", loadChildren: () => import("~/app/food/food.module").then((m) => m.FoodModule), canActivate: [AuthGuard] },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule), canActivate: [AuthGuard] },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule), canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

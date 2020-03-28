import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./shared/guards";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "auth", loadChildren: () => import("~/app/authorization/authorization.module").then((m) => m.AuthorizationModule) },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule), canActivate: [AuthGuard] },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule), canActivate: [AuthGuard] },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule), canActivate: [AuthGuard] },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule), canActivate: [AuthGuard] },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule), canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppLayoutComponent } from "./app-layout/app-layout.component";

const routes: Routes = [
    { path: "", redirectTo: "/auth", pathMatch: "full" },
    { path: "auth", loadChildren: () => import("~/app/authorization/authorization.module").then((m) => m.AuthorizationModule) },
    {
        path: "main", component: AppLayoutComponent,
        children: [
            { path: "", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
            { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
            { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
            { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
            { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) }
        ]
    },
 ];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

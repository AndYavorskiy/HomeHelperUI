import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    sideDrawer: RadSideDrawer;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("HomeComponent");
        this.sideDrawer = <RadSideDrawer>app.getRootView();
        
    }

    onDrawerButtonTap(): void {
        this.sideDrawer.showDrawer();
    }
}

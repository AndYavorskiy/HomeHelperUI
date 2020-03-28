import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "./services";
import { FoodModel } from "./models";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    foodList: FoodModel[] = [];

    constructor(private foodService: FoodService) {
    }

    ngOnInit(): void {
        this.foodService.getAll()
            .subscribe(data => {
                this.foodList = data;
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

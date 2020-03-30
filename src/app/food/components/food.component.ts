import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "../services";
import { FoodModel } from "../models";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { FoodModule } from "../food.module";

@Component({
    selector: "food",
    templateUrl: "./food.component.html",
    styleUrls: ["./food.component.scss"]
})
export class FoodComponent implements OnInit {

    dataItems: ObservableArray<FoodModel>;
    isLoading = true;

    constructor(private foodService: FoodService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.dataItems = new ObservableArray<FoodModel>();
        this.foodService.getAll()
            .subscribe(data => {
                this.dataItems.push(data);
                this.isLoading = false;
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onPullToRefreshInitiated(args: ListViewEventData) {
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }

    navigateToAdd(): void {

        this.routerExtensions.navigate(["/add"], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "easeIn"
            }
        });
    }

    navigateToDetails(item: FoodModel) {
        this.routerExtensions.navigate(['food',item.id], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 150,
                curve: "easeIn"
            }
        });
    }
}

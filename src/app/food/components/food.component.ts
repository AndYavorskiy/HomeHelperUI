import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "../services";
import { FoodModel } from "../models";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "food",
    templateUrl: "./food.component.html",
    styleUrls: ["./food.component.scss"]
})
export class FoodComponent implements OnInit {
    dataItems: ObservableArray<FoodModel>;

    constructor(private foodService: FoodService) {
    }

    ngOnInit(): void {
        this.dataItems = new ObservableArray<FoodModel>();
        this.foodService.getAll()
            .subscribe(data => {
                this.dataItems.push(data);
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    public onPullToRefreshInitiated(args: ListViewEventData) {
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}

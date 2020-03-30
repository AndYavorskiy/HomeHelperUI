import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "../../services";
import { FoodModel } from "../../models";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "food",
    templateUrl: "./food-create.component.html",
    styleUrls: ["./food-create.component.scss"]
})
export class FoodCreateComponent implements OnInit {

    data: FoodModel;
    isLoading = true;

    constructor(private foodService: FoodService,
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
     
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}

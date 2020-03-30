import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "../../services";
import { FoodModel } from "../../models";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "food",
    templateUrl: "./food-details.component.html",
    styleUrls: ["./food-details.component.scss"]
})
export class FoodDetailsComponent implements OnInit {

    data: FoodModel;
    isLoading = true;

    constructor(private foodService: FoodService,
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.foodService.get(params.get("id"))
                .subscribe(data => {
                    this.data = data;
                    this.isLoading = false;
                });
        });
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    onSwipe(args){
        console.log(args);
        
    }
}

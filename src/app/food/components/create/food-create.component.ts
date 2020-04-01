import * as app from "tns-core-modules/application";

import { Component, OnInit } from "@angular/core";

import { FoodService } from "../../services";
import { FoodModel } from "../../models";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "food-create",
    templateUrl: "./food-create.component.html",
    styleUrls: ["./food-create.component.scss"]
})
export class FoodCreateComponent implements OnInit {

    data: FoodModel;
    isLoading = true;

    form: FormGroup;

    constructor(private foodService: FoodService,
        private routerExtensions: RouterExtensions,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            amount: [''],
            hasExpiration: [false],
            expiration: [new Date()],
            description: ['']
        });
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    submit() {
        console.log(this.form.value);

        if (this.form.valid) {
            const formData = this.form.getRawValue();

            const task = Object.assign({}, this.data || new FoodModel());

            task.name = formData.name;
            task.amount = formData.amount;
            task.expirationDate = formData.expirationDate;
            task.description = formData.description;

            if (!this.data) {
                this.foodService.create(task)
                    .subscribe(value => this.goBack());
            } else {
                this.foodService.update(task)
                    .subscribe(value => this.goBack());
            }
        }
    }
}

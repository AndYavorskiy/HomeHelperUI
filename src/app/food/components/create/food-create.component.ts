import * as app from "tns-core-modules/application";
import * as moment from 'moment';

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

        this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get("id");

            if (id) {
                this.isLoading = true;

                this.foodService.get(id)
                    .subscribe(data => {
                        this.data = data;

                        this.form.controls.name.setValue(data.name);
                        this.form.controls.amount.setValue(data.amount);

                        if (data.expirationDate) {
                            this.form.controls.hasExpiration.setValue(true);
                            this.form.controls.expiration.setValue(data.expirationDate);
                        }

                        this.form.controls.description.setValue(data.description);

                        this.isLoading = false;
                    });
            }
        })
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
            task.expirationDate = !!formData.hasExpiration
                ? moment(formData.expirationDate).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
                : null;
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

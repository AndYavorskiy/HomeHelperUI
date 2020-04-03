import * as app from "tns-core-modules/application";
import * as moment from 'moment';

import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BasketService } from "~/app/shared/services";
import { BasketItemModel, BasketItemType } from "~/app/shared/models";

@Component({
    selector: "basket-create",
    templateUrl: "./basket-create.component.html",
    styleUrls: ["./basket-create.component.scss"]
})
export class BasketCreateComponent implements OnInit {

    data: BasketItemModel;
    isLoading = true;

    form: FormGroup;
    selectedType = BasketItemType.Food;

    types = BasketItemType;

    constructor(private basketService: BasketService,
        private routerExtensions: RouterExtensions,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            amount: ['', Validators.required],
            description: [''],
            hint: ['']
        });

        this.activatedRoute.paramMap.subscribe(params => {
            const id = params.get("id");

            if (id) {
                this.isLoading = true;

                this.basketService.get(id)
                    .subscribe(data => {
                        this.data = data;

                        this.form.controls.name.setValue(data.name);
                        this.form.controls.amount.setValue(data.amount);
                        this.form.controls.description.setValue(data.description);
                        this.form.controls.hint.setValue(data.hint);

                        this.selectedType = data.itemType;

                        this.isLoading = false;
                    });
            }
        })
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    submit() {
        if (this.form.valid) {
            const formData = this.form.getRawValue();

            const model = Object.assign({}, this.data || new BasketItemModel());

            model.name = formData.name;
            model.amount = formData.amount;
            model.description = formData.description;
            model.hint = formData.hint;
            model.itemType = this.selectedType;

            if (!this.data) {
                this.basketService.create(model)
                    .subscribe(value => this.goBack());
            } else {
                this.basketService.update(model)
                    .subscribe(value => this.goBack());
            }
        }
    }
}

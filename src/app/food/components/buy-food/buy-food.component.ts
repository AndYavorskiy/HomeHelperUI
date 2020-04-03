import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as app from "tns-core-modules/application";
import { BasketItemModel, BasketCompletePurchaseModel, BasketItemType } from "~/app/shared/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { BasketService } from "~/app/shared/services";
import { FoodModel } from "../../models";

@Component({
    selector: "buy-food",
    templateUrl: "./buy-food.component.html",
    styleUrls: ["./buy-food.component.scss"]
})
export class BuyFoodComponent implements OnInit {

    data: FoodModel;
    form: FormGroup;

    constructor(private fb: FormBuilder,
        private basketService: BasketService,
        private modalDialogParams: ModalDialogParams) {

        this.data = modalDialogParams.context as FoodModel;
    }

    ngOnInit() {
        this.form = this.fb.group({
            amount: [this.data.amount, Validators.required],
            hint: [this.data.description]
        });
    }

    buy() {
        if (this.form.valid) {
            const formData = this.form.getRawValue();

            let model = {
                name: this.data.name,
                description: this.data.description,
                itemType: BasketItemType.Food,
                amount: formData.amount,
                hint: formData.hint,
                dateCreated: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
            } as BasketItemModel;

            this.basketService.create(model)
                .subscribe(() => {
                    this.modalDialogParams.closeCallback(true);
                });
        }
    }
}

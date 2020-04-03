import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import * as app from "tns-core-modules/application";
import { BasketItemModel, BasketCompletePurchaseModel } from "~/app/shared/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { BasketService } from "~/app/shared/services";

@Component({
    selector: "complete-purchase",
    templateUrl: "./complete-purchase.component.html",
    styleUrls: ["./complete-purchase.component.scss"]
})
export class CompletePurchase implements OnInit {

    data: BasketItemModel;
    form: FormGroup;

    constructor(private fb: FormBuilder,
        private basketService: BasketService,
        private modalDialogParams: ModalDialogParams) {

        this.data = modalDialogParams.context as BasketItemModel;
    }

    ngOnInit() {
        this.form = this.fb.group({
            amount: [this.data.amount, Validators.required],
            hasExpiration: [false],
            expiration: [new Date()],
            description: [this.data.description]
        });
    }

    complete() {
        if (this.form.valid) {
            const formData = this.form.getRawValue();

            let completeModel = {
                id: this.data.id,
                amount: formData.amount,
                expirationDate: !!formData.hasExpiration
                    ? moment(formData.expirationDate).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
                    : null
            } as BasketCompletePurchaseModel;

            this.basketService.completePurchase(completeModel)
                .subscribe(() => {
                    this.modalDialogParams.closeCallback(true);
                })
        }
    }
}

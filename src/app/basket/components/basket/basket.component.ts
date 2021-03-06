import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { View, Page } from 'tns-core-modules/ui';
import { EventData } from "tns-core-modules/ui/frame/frame";
import { layout } from "tns-core-modules/utils/utils";

import { BasketService } from "~/app/shared/services";
import { BasketItemType, BasketItemModel } from "~/app/shared/models";


import { Frame } from "tns-core-modules/ui/frame/frame";
import { screen, isIOS } from "tns-core-modules/platform";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { CompletePurchase } from "../complete-purchase/complete-purchase.component";

@Component({
    selector: "basket",
    templateUrl: "./basket.component.html",
    styleUrls: ["./basket.component.scss"]
})
export class BasketComponent implements OnInit {

    dataItems = new ObservableArray<BasketItemModel>();
    isLoading = true;

    private leftItem: View;
    private rightItem: View;
    private mainView: View;

    @ViewChild("myListView", { read: RadListViewComponent, static: false })
    myListViewComponent: RadListViewComponent;

    constructor(private page: Page,
        private modalDialogService: ModalDialogService,
        private basketService: BasketService,
        private viewRef: ViewContainerRef,
        private routerExtensions: RouterExtensions) {
    }

    ngOnInit() {
        this.basketService.getAll()
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
        this.isLoading = true;

        this.basketService.getAll()
            .subscribe(data => {
                this.dataItems.splice(0);
                this.dataItems.push(data);
                this.isLoading = false;
                listView.notifyPullToRefreshFinished();
            });
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

    onCellSwiping(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['swipeView'];
        this.mainView = args['mainView'];
        this.leftItem = swipeView.getViewById('left-stack');
        this.rightItem = swipeView.getViewById('right-stack');

        if (args.data.x > 0) {
            const leftDimensions = View.measureChild(
                <View>this.leftItem.parent,
                this.leftItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(this.mainView.getMeasuredHeight(), layout.EXACTLY));
            View.layoutChild(<View>this.leftItem.parent, this.leftItem, 0, 0, leftDimensions.measuredWidth, leftDimensions.measuredHeight);
            this.hideOtherSwipeTemplateView("left");
        } else {
            const rightDimensions = View.measureChild(
                <View>this.rightItem.parent,
                this.rightItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(this.mainView.getMeasuredHeight(), layout.EXACTLY));

            View.layoutChild(<View>this.rightItem.parent, this.rightItem, this.mainView.getMeasuredWidth() - rightDimensions.measuredWidth, 0, this.mainView.getMeasuredWidth(), rightDimensions.measuredHeight);
            this.hideOtherSwipeTemplateView("right");
        }
    }

    private hideOtherSwipeTemplateView(currentSwipeView: string) {
        switch (currentSwipeView) {
            case "left":
                if (this.rightItem.getActualSize().width !== 0) {
                    View.layoutChild(<View>this.rightItem.parent, this.rightItem, this.mainView.getMeasuredWidth(), 0, this.mainView.getMeasuredWidth(), 0);
                }
                break;
            case "right":
                if (this.leftItem.getActualSize().width !== 0) {
                    View.layoutChild(<View>this.leftItem.parent, this.leftItem, 0, 0, 0, 0);
                }
                break;
            default:
                break;
        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        swipeLimits.threshold = args['mainView'].getMeasuredWidth() * 0.2; // 20% of whole width
        swipeLimits.left = args['mainView'].getMeasuredWidth() * 0.3; // 30% of whole width
        swipeLimits.right = args['mainView'].getMeasuredWidth() * 0.65; // 65% of whole width
    }

    public onSwipeActionClick(args: EventData) {
        let itemView = args.object as View;
        var rowIndex = this.myListViewComponent.listView.items.indexOf(itemView.bindingContext);

        switch (itemView.id) {
            case "btnComplete":
                this.completeItem(rowIndex);
                break;
            case "btnDelete":
                this.deleteItem(rowIndex);
                break;
            case "btnEdit":
                this.editItem(rowIndex);
                break;
            default:
                break;
        }

        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    deleteItem(index: number) {
        const item = this.dataItems.getItem(index);

        this.basketService.delete(item.id)
            .subscribe(() => {
                this.dataItems.splice(index, 1);
            });
    }

    editItem(index: number) {
        const item = this.dataItems.getItem(index);

        this.routerExtensions.navigate(["basket/update", item.id], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "easeIn"
            }
        });
    }

    completeItem(index: number) {
        const item = this.dataItems.getItem(index);

        this.modalDialogService.showModal(CompletePurchase,
            {
                viewContainerRef: this.viewRef,
                context: item,
                animated: true
            }).then(() => { });
    }

    actionFrameLoaded(args: EventData) {
        const frame = args.object as Frame;

        frame.translateY = screen.mainScreen.heightDIPs;
    }
}

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Component, OnInit, ViewChild } from "@angular/core";

import { FoodService } from "../../services";
import { FoodModel } from "../../models";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";


import { View } from 'tns-core-modules/ui/core/view';
import { Label } from 'tns-core-modules/ui/label';
import { Frame, EventData } from "tns-core-modules/ui/frame/frame";
import { layout } from "tns-core-modules/utils/utils";

@Component({
    selector: "food",
    templateUrl: "./food.component.html",
    styleUrls: ["./food.component.scss"]
})
export class FoodComponent implements OnInit {

    dataItems: ObservableArray<FoodModel>;
    isLoading = true;


    @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

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
        this.isLoading = true;

        this.foodService.getAll()
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

    navigateToDetails(item: FoodModel) {
        this.routerExtensions.navigate(['food', item.id], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 150,
                curve: "easeIn"
            }
        });
    }

    onListItemLongPress(item: FoodModel) {

    }

    private leftItem: View;
    private rightItem: View;
    private mainView: View;


    // >> angular-listview-swipe-action-multiple
    public onCellSwiping(args: ListViewEventData) {
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
    // << angular-listview-swipe-action-multiple

    // >> angular-listview-swipe-action-multiple-limits
    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        swipeLimits.threshold = args['mainView'].getMeasuredWidth() * 0.2; // 20% of whole width
        swipeLimits.left = args['mainView'].getMeasuredWidth() * 0.3; // 30% of whole width
        swipeLimits.right = args['mainView'].getMeasuredWidth() * 0.65; // 65% of whole width
    }
    // << angular-listview-swipe-action-multiple-limits

    public onSwipeCellFinished(args: ListViewEventData) {
        if (args.data.x > 200) {
            console.log("Perform left action");
        } else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    }

    public onSwipeActionClick(args: EventData) {
        let itemView = args.object as View;
        var rowIndex = this.myListViewComponent.listView.items.indexOf(itemView.bindingContext);
        console.log("Button clicked: " + itemView.id + " for item with index: " + rowIndex);
    
        switch (itemView.id) {
            case "btnBuy":
                break;
            case "btnDelete":
                this.deleteItem(rowIndex);
                break;
            case "btnEdit":
                break;
            default:
                break;
        }
    
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    deleteItem(index: number) {
        const item = this.dataItems.getItem(index);

        this.foodService.delete(item.id)
            .subscribe(() => {
                this.dataItems.splice(index, 1);
            });
    }
}
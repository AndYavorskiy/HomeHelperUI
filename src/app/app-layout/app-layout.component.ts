import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "app-layout",
    templateUrl: "./app-layout.component.html"
})
export class AppLayoutComponent implements OnInit {

    public _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private _changeDetectionRef: ChangeDetectorRef, private page: Page) {
        // Use the component constructor to inject services.
        page.actionBarHidden = true;

    }

    ngOnInit(): void {
        console.log("------> AppLayoutComponent");
        
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events.subscribe(x=>console.log(x));

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        this.drawer.closeDrawer();
    }
}

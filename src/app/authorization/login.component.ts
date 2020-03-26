import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { AuthorizationService } from "./services";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    processing = false;
    isLoggingIn = true;

    emailText: string
    passwordText: string;
    confirmPasswordText: string;

    @ViewChild("password", { static: false }) password: ElementRef;
    @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private authorizationService: AuthorizationService) {
        this.page.actionBarHidden = true;
        this.emailText = "root@gmail.com";
        this.passwordText = "12345678";
    }

    ngOnInit() {
        // Init your component properties here.
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.emailText || !this.passwordText) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.authorizationService.login({ login: this.emailText, password: this.passwordText })
            .subscribe(data => {
                this.processing = false;
                this.routerExtensions.navigate(["../main"], { clearHistory: true });
                console.log(data);
            }, error => {
                this.processing = false;
                this.alert("Unfortunately we could not find your account.");
            });
    }

    register() {
        if (this.passwordText != this.confirmPasswordText) {
            this.alert("Your passwords do not match.");
            return;
        }

        // this.userService.register(this.user)
        //     .then(() => {
        //         this.processing = false;
        //         this.alert("Your account was successfully created.");
        //         this.isLoggingIn = true;
        //     })
        //     .catch(() => {
        //         this.processing = false;
        //         this.alert("Unfortunately we were unable to create your account.");
        //     });
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                // this.userService.resetPassword(data.text.trim())
                // .then(() => {
                this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                // }).catch(() => {
                // this.alert("Unfortunately, an error occurred resetting your password.");
                // });
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "APP NAME",
            okButtonText: "OK",
            message: message
        });
    }


}

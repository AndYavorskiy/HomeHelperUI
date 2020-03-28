import { Subject, BehaviorSubject } from "rxjs";
import * as appSettings from "tns-core-modules/application-settings";

import { Injectable } from "@angular/core";

import { UserModel } from "../models";
import { AppSettingKeys } from "../app-setting-keys.constant";

@Injectable()
export class AppContextService {

    private userModelSubject: BehaviorSubject<UserModel>;

    constructor() {
        const user = !!appSettings.getString(AppSettingKeys.UserInfo)
            ? JSON.parse(appSettings.getString(AppSettingKeys.UserInfo))
            : null;
        console.log(user);
        this.userModelSubject = new BehaviorSubject<UserModel>(user);
    }

    public get UserModel() {
        return this.userModelSubject.asObservable();
    }

    public updateUserInfo(userModel: UserModel) {
        console.log(userModel);

        appSettings.setString(AppSettingKeys.UserInfo, JSON.stringify(userModel));

        this.userModelSubject.next(userModel);
    }
}

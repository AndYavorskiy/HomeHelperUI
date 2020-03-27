import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as appSettings from "tns-core-modules/application-settings";
import { AuthTokenModel, AuthModel } from "../models";
import { AppSettingKeys } from "../app-setting-keys.constant";

@Injectable()
export class AuthorizationService {
    private serverUrl = "http://192.168.31.72:54190/api/auth";

    constructor(private http: HttpClient) { }

    login(authModel: AuthModel) {
        return this.http.post<AuthTokenModel>(`${this.serverUrl}/login`, authModel);
    }

    refresh(token: string, refreshToken: string) {
        return this.http.post<AuthTokenModel>(`${this.serverUrl}/refresh`, {
            token: token,
            refreshToken: refreshToken
        });
    }

    getAuthToken() {
        return appSettings.hasKey(AppSettingKeys.AuthCredentials) ? JSON.parse(appSettings.getString(AppSettingKeys.AuthCredentials)) as AuthTokenModel : null;
    }

    saveAuthToken(authTokenModel: AuthTokenModel) {
        appSettings.setString(AppSettingKeys.AuthCredentials, JSON.stringify(authTokenModel));
    }
}

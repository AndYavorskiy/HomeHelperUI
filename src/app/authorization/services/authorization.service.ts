import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserTokenModel, AuthModel } from "../models";

@Injectable()
export class AuthorizationService {
    private serverUrl = "http://192.168.31.72:54190/api/auth";

    constructor(private http: HttpClient) { }

    login(authModel: AuthModel) {
        return this.http.post<UserTokenModel>(`${this.serverUrl}/login`, authModel);
    }

    refresh() {
        return this.http.get<UserTokenModel>(`${this.serverUrl}/refresh`);
    }

    ping() {
        return this.http.get(`${this.serverUrl}/ping`);
    }
}

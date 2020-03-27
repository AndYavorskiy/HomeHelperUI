import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserModel } from "../models";

@Injectable()
export class UserService {
    private serverUrl = "http://192.168.31.72:54180/api/user";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserModel[]>(`${this.serverUrl}`);
    }

    get(userId: string) {
        return this.http.get<UserModel>(`${this.serverUrl}/${userId}`);
    }

    getInfo() {
        return this.http.get<UserModel>(`${this.serverUrl}/info`);
    }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { FoodModel } from "../models";

@Injectable()
export class FoodService {
    private serverUrl = "http://192.168.31.72:54150/api/food";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<FoodModel[]>(`${this.serverUrl}`);
    }

    get(id: string) {
        return this.http.get<FoodModel>(`${this.serverUrl}/${id}`);
    }

    create(foodModel: FoodModel) {
        return this.http.post<FoodModel>(`${this.serverUrl}`, foodModel);
    }

    update(foodModel: FoodModel) {
        return this.http.put<FoodModel>(`${this.serverUrl}/${foodModel.id}`, foodModel);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.serverUrl}/${id}`);
    }
}
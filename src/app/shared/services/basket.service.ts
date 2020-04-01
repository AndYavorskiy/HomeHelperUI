import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BasketItemModel, BasketCompletePurchaseModel } from "../models";

@Injectable()
export class BasketService {
    private serverUrl = "http://192.168.31.72:54160/api/basket";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<BasketItemModel[]>(`${this.serverUrl}`);
    }

    get(id: string) {
        return this.http.get<BasketItemModel>(`${this.serverUrl}/${id}`);
    }

    create(model: BasketItemModel) {
        return this.http.post<BasketItemModel>(`${this.serverUrl}`, model);
    }

    update(model: BasketItemModel) {
        return this.http.put<BasketItemModel>(`${this.serverUrl}/${model.id}`, model);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.serverUrl}/${id}`);
    }

    completePurchase(model: BasketCompletePurchaseModel) {
        return this.http.post<BasketItemModel>(`${this.serverUrl}/complete`, model);
    }
}

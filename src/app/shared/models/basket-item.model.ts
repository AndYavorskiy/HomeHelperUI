import { BasketItemType } from "./basket-item.enum";

export interface BasketItemModel {
    id: string;
    name: string;
    amount: string;
    description: string;
    itemType: BasketItemType;
    dateCreated: Date | string;
    expirationDate?: Date | string;
    userId: string;
}
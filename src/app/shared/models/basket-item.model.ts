import { BasketItemType } from "./basket-item.enum";

export class BasketItemModel {
    id: string;
    name: string;
    amount: string;
    hint: string;
    description: string;
    itemType: BasketItemType;
    dateCreated: Date | string;
    expirationDate?: Date | string;
    userId: string;
}
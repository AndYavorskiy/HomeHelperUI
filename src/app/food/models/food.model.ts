export class FoodModel {
    id: string;
    name: string;
    amount: string;
    description: string;
    expirationDate?: Date | string;
    userId: string;

    isExpanded: boolean;
}

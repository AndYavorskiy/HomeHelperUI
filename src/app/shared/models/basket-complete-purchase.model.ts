export interface BasketCompletePurchaseModel {
    id: string;
    amount: string;
    expirationDate?: Date | string;
}
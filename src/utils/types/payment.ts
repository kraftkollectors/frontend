

export type PaymentDuration = 'yearly' | 'monthly' | 'weekly'

export type Payment = {
    _id: string;
    plan: PaymentDuration;
    date: string;
    active: boolean;
    amount: string;
    userId: string;
    createdAt: string;
}
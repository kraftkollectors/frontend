

export type PaymentDuration = 'yearly' | 'monthly' | 'weekly'

export type Payment = {
    _id: string;
    duration: PaymentDuration;
    date: string;
    isActive: boolean;
    amount: string;
    userId: string;
    createdAt: string;
}
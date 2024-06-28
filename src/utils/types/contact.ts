export type ContactMessage = {
    _id: string;
    email: string;
    name: string;
    phone: string;
    subject: string;
    message: string;
    read: boolean;
    status: 'resolved' | 'unresolved';
    createdAt: string;
}
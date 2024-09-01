import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function ActivePayment() {
    return (
        <AdminCard
        title="2,000"
        label="Active Payment"
        icon={<AppIcons.AdminPayments />}
        bg="secondary"
         />
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function ActivePayments() {
    return (
        <AdminCard
        title="2,000"
        label="Active Payments"
        icon={<AppIcons.AdminPayments />}
        bg="secondary"
         />
    );
}
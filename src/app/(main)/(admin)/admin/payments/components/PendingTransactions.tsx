import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function PendingTransactions() {
    return (
        <AdminCard
        title="2,000"
        label="Pending Transaction"
        icon={<AppIcons.AdminPayments />}
        bg="secondary"
         />
    );
}
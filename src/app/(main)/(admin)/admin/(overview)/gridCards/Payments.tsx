import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchPayments } from "@/actions/admin";

export default async function Payments() {
    const payments = await fetchPayments({ throwsError: false});
    if (payments === 'error' || !payments) return null;;
    
    
    return (
        <AdminCard
        icon={<AppIcons.AdminPayments />}
        label="Payments"
        title={`${payments.totalDocuments}`}
        bg="secondary"
        >
            <ViewAll href={paths.adminPayments} />
        </AdminCard>
    );
}
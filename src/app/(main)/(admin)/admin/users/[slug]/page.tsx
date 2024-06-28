import { PageTitle } from "@/components/admin";
import Profile from './Profile';
import UserDetails from './UserDetails';
import EducationAndCertification from './EducationAndCertification';
import { dummyArtisan, dummyUser } from "@/utils/dummy";
import ListedServices from "./ListedServices";
import { Suspense } from "react";
import PaymentHistory from "./PaymentHistory";

export default function Page() {
    const user = dummyUser;
    const artisan = dummyArtisan;

    return (
        <div className="flex flex-col gap-4">
            <PageTitle>
                <span className="text-black-300">Users/</span>
                Maduakolam Justice
            </PageTitle>
            <Profile {...user} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UserDetails user={user} artisan={artisan} />
                <Suspense fallback={loadingEdcation}>
                    <EducationAndCertification />
                </Suspense>
                <Suspense fallback={loadingServices}>
                    <ListedServices userId="" />
                </Suspense>
                <Suspense fallback={loadingEdcation}>
                    <PaymentHistory userId="" />
                </Suspense>
            </div>
        </div>
    );
}

const loadingEdcation = (<div className="skeleton col-span-1 h-40 p-4 grid gap-1">
    <div className="skaleton h-10"></div>
    <div className="skaleton h-10"></div>
</div>)

const loadingServices = (<div className="skeleton col-span-1 lg:col-span-2 p-4 grid gap-1">
    <div className="skaleton h-5"></div>
    <div className="skaleton h-5"></div>
</div>)
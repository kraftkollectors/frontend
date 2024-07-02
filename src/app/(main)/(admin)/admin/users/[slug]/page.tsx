import { PageTitle } from "@/components/admin";
import Profile from './Profile';
import UserDetails from './UserDetails';
import EducationAndCertification from './EducationAndCertification';
import { dummyArtisan, dummyUser } from "@/utils/dummy";
import ListedServices from "./ListedServices";
import { Suspense } from "react";
import PaymentHistory from "./PaymentHistory";
import { AppPageProps } from "@/utils/types/basicTypes";
import { fetchUser } from "@/actions";
import { notFound } from "next/navigation";
import { Artisan } from "@/utils/types/artisan";
import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import { fullName } from "@/functions/helpers";

export default async function Page({ params }: AppPageProps<{ slug: string }>) {
    if (!params) notFound();
    const user = await fetchUser({ isPublic: true, params: params.slug });
    if (!user) notFound();
    if (user == 'error') throw new Error("Unable to connect");
    let artisan: Artisan | undefined;
    if (user.isArtisan) {
        const _artisan = await fetchArtisan({ params: params.slug, isPublic: true });
        if (!_artisan || _artisan == 'error') artisan = undefined;
        else artisan = _artisan;
    }

    return (
        <div className="flex flex-col gap-4">
            <PageTitle>
                <span className="text-black-300">Users /</span>
                {fullName(user.firstName, user.lastName)}
            </PageTitle>
            <Profile {...user} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UserDetails user={user} artisan={artisan} />
                {
                    user.isArtisan &&
                    <>
                        <Suspense fallback={loadingEdcation}>
                            <EducationAndCertification userId={user._id} />
                        </Suspense>
                        <Suspense fallback={loadingServices}>
                            <ListedServices userId={user._id} />
                        </Suspense>
                        <Suspense fallback={loadingEdcation}>
                            <PaymentHistory userId={user._id} />
                        </Suspense>
                    </>
                }
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
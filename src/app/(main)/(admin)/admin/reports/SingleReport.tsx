/* eslint-disable @next/next/no-img-element */
'use client'

import AppIcons from "@/components/AppIcons";
import { useChangeSearchParams } from "@/hooks";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useDeleteReport, useFetchReport, useMarkReportResolved } from "./hooks";
import SmallComponents from "@/components/SmallComponents";
import { FormButton } from "@/components";
import { AdminAuth } from "@/components/admin";
import ReportedPost from "./components/ReportedPost";
import ReportedUser from "./components/ReportedUser";

export default function SingleReport() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        if (params.get('reportId')) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [params]);

    function closeModal() {
        back();
    }

    const { data, isLoading, error } = useFetchReport(params.get('reportId'));
    const { resolveAction, isResolved } = useMarkReportResolved(data ? data.resolved : false);
    const deleteAction = useDeleteReport(closeModal);

    return (
        <Dialog.Root open={open}>
            <Dialog.Content style={{
                maxWidth: 500
            }}>
                <div className="flex flex-col gap-5 pt-6 relative">
                    <button
                        onClick={closeModal}
                        className="absolute icon-btn p-2 -right-2 -top-2"><FaX /></button>
                    <div className="aspect-square inline-flex p-3 bg-black-50 items-center rounded-full justify-center size-10 self-center">
                        <AppIcons.AdminReport />
                    </div>
                    {
                        isLoading ? <SmallComponents.Loading />
                            : error || !data ? <div className="info-box">Connection error</div>
                                : <>
                                <ReportedUser userId={data.reporterId} />
                                    <p className="rounded bg-[#f9f9f9] p-3 text-black-400 font-semibold text-center">
                                        {data.text}
                                    </p>
                                    <div className="flex flex-col gap-3 font-semibold text-label">
                                        <h3 className="text-black-200">Reported post:</h3>
                                        <ReportedPost postId={data.postId} />
                                    </div>
                                    <div className="flex gap-4 [&>*]:w-full [&_button]:w-full [&_button]:font-semibold">
                                        <form action={deleteAction}>
                                            <FormButton className="delete-btn py-2.5">Delete</FormButton>
                                            <AdminAuth />
                                            <input type="hidden" name="reportId" value={data._id} />
                                        </form>
                                        {!isResolved && <form action={resolveAction}>
                                            <FormButton className="edit-btn py-2.5 border-primary-light border">Mark as resolved</FormButton>
                                            <AdminAuth />
                                            <input type="hidden" name="reportId" value={data._id} />
                                        </form>}
                                    </div>
                                </>
                    }
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

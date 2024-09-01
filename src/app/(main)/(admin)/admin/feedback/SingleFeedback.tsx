'use client'

import AppIcons from "@/components/AppIcons";
import { useChangeSearchParams } from "@/hooks";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useDeleteFeedback, useFetchContactMessage, useMarkFeedbackResolved } from "./hooks";
import SmallComponents from "@/components/SmallComponents";
import { fullName } from "@/functions/helpers";
import { FormButton } from "@/components";
import { AdminAuth } from "@/components/admin";

export default function SingleFeedback() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        if (params.get('feedbackId')) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [params]);

    function closeModal() {
        back();
    }

    const { data, isLoading, error } = useFetchContactMessage(params.get('feedbackId'));
    const {resolveAction, isResolved} = useMarkFeedbackResolved(data ? data.resolved : false);
    const deleteAction = useDeleteFeedback(closeModal);

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
                        <AppIcons.AdminFeedback />
                    </div>
                    {
                        isLoading ? <SmallComponents.Loading />
                            : error || !data ? <div className="info-box">Connection error</div>
                                : <>
                                    <h2 className="font-semibold text-black-300 text-label text-center">
                                        {fullName(...data.name.split(' '))}
                                        <br />
                                        {data.email}
                                        <br />
                                        {data.phone}
                                    </h2>
                                    <p className="rounded bg-[#f9f9f9] p-3 text-black-400 font-semibold text-center">
                                        {data.message}  
                                    </p>
                                    <div className="flex gap-4 [&>*]:w-full [&_button]:w-full [&_button]:font-semibold">
                                        <form action={deleteAction}>
                                            <FormButton className="delete-btn py-2.5">Delete</FormButton>
                                            <AdminAuth />
                                            <input type="hidden" name="feedbackId" value={data._id} />
                                        </form>
                                        {!isResolved && <form action={resolveAction}>
                                            <FormButton className="edit-btn py-2.5 border-primary-light border">Mark as resolved</FormButton>
                                            <AdminAuth />
                                            <input type="hidden" name="feedbackId" value={data._id} />
                                        </form>}
                                    </div>
                                </>
                    }
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
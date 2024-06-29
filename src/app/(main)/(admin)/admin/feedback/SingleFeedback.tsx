'use client'

import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import AppInput from "@/components/ui/AppInput";
import { useChangeSearchParams } from "@/hooks";
import { paths } from "@/utils";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

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
                    <h2 className="font-semibold text-black-300 text-label text-center">
                        Maduakolam Justice
                        <br />
                        just@gmail.com
                        <br />
                        0123456789
                    </h2>
                    <p className="rounded bg-[#f9f9f9] p-3 text-black-400 font-semibold text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est reprehenderit quod nemo qui assumenda tempore. Eaque quae iste laboriosam laudantium?
                    </p>
                    <div className="grid gap-4 grid-cols-2 [&_button]:w-full  [&_button]:font-semibold">
                        <form action="">
                            <button className="delete-btn py-2.5">Delete</button>
                        </form>
                        <form action="">
                            <button className="edit-btn py-2.5 border-primary border">Mark as resolved</button>
                        </form>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
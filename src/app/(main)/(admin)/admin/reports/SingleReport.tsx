/* eslint-disable @next/next/no-img-element */
'use client'

import AppIcons from "@/components/AppIcons";
import { useChangeSearchParams } from "@/hooks";
import { paths } from "@/utils";
import { Dialog } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function SingleReport() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const serviceId = params.get('reportId') ?? ''

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
                    <h2 className="font-semibold text-black-300 text-label text-center">
                        Maduakolam Justice
                        <br />
                        just@gmail.com
                    </h2>
                    <p className="rounded bg-[#f9f9f9] p-3 text-black-400 font-semibold text-center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est reprehenderit quod nemo qui assumenda tempore. Eaque quae iste laboriosam laudantium?
                    </p>
                    <div className="flex flex-col gap-3 font-semibold text-label">
                        <h3 className="text-black-200">Reported post:</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-center">
                            <img src={'/images/become-a-seller.png'} alt="img" className="rounded-md lg:col-span-2 bg-black-50 overflow-hidden aspect-[4/3]" />
                            <div className="flex flex-col gap-2 lg:col-span-3">
                                <h2 className="text-black-500">Sandesh Koshti</h2>
                                <h3 className="text-black-400 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, fuga.</h3>
                                <p className="text-black-300">Entertainment | Dj</p>
                                <Link href={paths.service(serviceId)}
                                className="inline-flex items-center gap-1 text-primary">
                                    View details
                                    <AppIcons.ExternalLink />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-2 [&_button]:w-full  [&_button]:font-semibold">
                        <form action="">
                            <button className="delete-btn py-2.5">Delete</button>
                        </form>
                        <form action="">
                            <button className="edit-btn py-2.5 border-primary-light border">Mark as resolved</button>
                        </form>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
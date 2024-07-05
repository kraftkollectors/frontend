'use client'

import { newAdvert } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { ADVERT_DURATIONS } from "@/utils/constants";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { FaX } from "react-icons/fa6";

export default function NewAdvert() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const fields: AppInputProps[] = useMemo(() => [
        {
            name: 'title',
            placeholder: "Title",
            title: "Title"
        },
        {
            name: 'file',
            placeholder: "Select Photo",
            title: "Image",
            type: 'file',
            inputProps: {
                accept: "image/*, video/*"
            }
        },
        {
            name: 'url',
            placeholder: "URL Link",
            title: "URL Link",
            type: 'url',
        },
        {
            name: 'startDate',
            placeholder: "Start date",
            title: "Start Date",
            type: 'date',
            readonly: false,
            inputProps: {
                min: new Date().toISOString().split('T')[0],
            }
        },
    ], [])

    useLayoutEffect(() => {
        if (params.get('action') === 'create') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [params]);

    function closeModal() {
        back();
    }

    const [res, action] = useFormState(newAdvert, {});
    useEffect(()=>{
        if(res.success) closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res])

    return (
        <Dialog.Root open={open}>
            <Dialog.Content style={{
                maxWidth: 500
            }}>
                <div className="flex flex-col gap-4 relative">
                    <button
                        onClick={closeModal}
                        className="absolute icon-btn p-2 -right-2 -top-2"><FaX /></button>
                    <div className="aspect-square inline-flex p-3 bg-black-50 items-center rounded-full justify-center size-10 self-center">
                        <AppIcons.AdminAdverts />
                    </div>
                    <h2 className="font-bold text-black-500 text-center">New Advert</h2>
                    <form action={action} className="flex gap-4 flex-col [&_#Image-input]:!py-0  [&_label]:font-semibold [&_#Image-input]:pointer-events-auto [&_#Image-input]:opacity-100 ">
                        {
                            fields.map(field => <AppInput key={field.name} {...field} error={res.fieldErrors && res.fieldErrors[field.name]} />)
                        }
                        <AppSelect
                            name="duration"
                            title="Dutation"
                            options={ADVERT_DURATIONS}
                            error={res.fieldErrors && res.fieldErrors['duration']}
                        />
                        <FormMessage res={res} />
                        <AdminAuth />
                        <div className="pt-6 flex justify-end">
                            <FormButton className="btn-dark-tiny flex-shrink-0 px-10 font-semibold py-2">Add</FormButton>
                        </div>
                    </form>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}


'use client'

import { FormButton } from "@/components";
import AppIcons from "@/components/AppIcons";
import SmallComponents from "@/components/SmallComponents";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { ADVERT_DURATIONS } from "@/utils/constants";
import { Dialog, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function EditAdvert() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const {isLoading} = useQuery({
        queryFn: async ()=>{
            await fetch('https://google.com');
        },
        queryKey: ['edit_advert', params]
    })
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
            type: 'file'
        },
        {
            name: 'startDate',
            placeholder: "Start date",
            title: "Start Date",
            type: 'date',
            inputProps: {
                min: new Date().toISOString().split('T')[0]
            }
        },
    ], [])

    useLayoutEffect(() => {
        if (params.get('advertId')) {
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
                <div className="flex flex-col gap-4 relative">
                    <button
                        onClick={closeModal}
                        className="absolute icon-btn p-2 -right-2 -top-2"><FaX /></button>
                    <div className="aspect-square inline-flex p-3 bg-black-50 items-center rounded-full justify-center size-10 self-center">
                        <AppIcons.AdminAdverts />
                    </div>
                    <h2 className="font-bold text-black-500 text-center">Edit Advert</h2>
                    {isLoading 
                    ? <SmallComponents.Loading />  
                    : <form action="" className="flex gap-4 flex-col [&_#Image-input]:!py-0 [&_label]:font-semibold">
                        {
                            fields.map(field => <AppInput key={field.name} {...field} />)
                            }
                       <AppSelect 
                       name="duration"
                       title="Dutation"
                       options={ADVERT_DURATIONS}
                       />
                        <div className="pt-6 flex justify-end">
                            <FormButton className="btn-dark-tiny flex-shrink-0 px-10 font-semibold py-2">Add</FormButton>
                        </div>
                    </form>}
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}


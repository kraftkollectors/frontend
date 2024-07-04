'use client'

import { newCategory } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import AppInput from "@/components/ui/AppInput";
import { useChangeSearchParams } from "@/hooks";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FaX } from "react-icons/fa6";

export default function NewCategory() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const [subCats, setSubCats] = useState<string[]>([]);

    useLayoutEffect(() => {
        if (params.get('action') === 'create') {
            setOpen(true);
        } else {
            setOpen(false);
            setSubCats([]);
        }

    }, [params]);

    const [res, action] = useFormState(newCategory, {}); useEffect(()=>{
        if(res.data && res.data === 'success'){
            closeModal();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res])

    function closeModal() {
        back();
    }

    return (
        <Dialog.Root open={open}>
            <Dialog.Content>
                <div className="flex flex-col gap-4 relative">
                    <button
                        onClick={closeModal}
                        className="absolute icon-btn p-2 -right-2 -top-2"><FaX /></button>
                    <div className="aspect-square inline-flex p-3 bg-black-50 items-center rounded-full justify-center size-10 self-center">
                        <AppIcons.AdminCategories />
                    </div>
                    <h2 className="font-bold text-black-500 text-center">Create a new category</h2>
                    <form action={action} className="flex gap-4 flex-col">
                        <AppInput {
                            ...{
                                name: 'title',
                                placeholder: "Enter new category",
                                title: "Category name",
                            }
                        } />
                        {
                            subCats.map((v, i) => (
                                <AppInput
                                    onChange={(val) => setSubCats(
                                        v => v.map(
                                            (item, index) => (index === i ? val : item)
                                        )
                                    )}
                                    inputProps={{
                                        autoFocus: i === subCats.length - 1
                                    }}
                                    value={v}
                                    key={i} title="Sub-category name" placeholder="Enter new sub-catergory" name="_" />
                            ))
                        }
                        <input type="hidden" name="subCategories" 
                        value={JSON.stringify(subCats.filter(i=>i.trim()))} />
                        <button
                            onClick={() => setSubCats(v => [...v, ''])}
                            type="button" role="button" className="inline-flex items-center p-2 w-fit"
                        >{subCats.length > 0 ? "Add another +" : 'Add sub-category +'}</button>
                        <FormMessage res={res} />
                        <div className="pt-6 flex justify-end">
                            <FormButton className="btn-dark-tiny flex-shrink-0 px-10 font-semibold py-2">Add</FormButton>
                        </div>
                        <AdminAuth />
                    </form>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
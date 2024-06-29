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

export default function NewCategory() {
    const { replace } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const [subCats, setSubCats] = useState<string[]>([]);

    useLayoutEffect(() => {
        if(params.get('action') === 'create'){
            setOpen(true);
        }else{
            setOpen(false);
            setSubCats([]);
        }
    }, [params]);

    function closeModal() {
        replace(paths.adminCategories);
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
                    <form action="" className="flex gap-4 flex-col">
                        <AppInput {
                            ...{
                                name: 'category',
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
                                    value={v}
                                    key={i} title="Sub-category name" placeholder="Enter new sub-catergory" name="subCategory" />
                            ))
                        }
                        <button
                            onClick={() => setSubCats(v => [...v, ''])}
                            type="button" role="button" className="inline-flex items-center py-2"
                        >{subCats.length > 0 ? "Add another +" : 'Add sub-category +'}</button>
                        <div className="pt-6 flex justify-end">
                            <FormButton className="btn-dark-tiny flex-shrink-0 px-10 font-semibold py-2">Add</FormButton>
                        </div>
                    </form>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
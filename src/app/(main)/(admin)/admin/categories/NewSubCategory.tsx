'use client'

import { newSubCategory } from "@/actions";
import { FormButton, FormMessage } from "@/components";
import { AdminAuth } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { FaX } from "react-icons/fa6";

export default function NewSubCategory() {
    const { back } = useRouter();
    const { params } = useChangeSearchParams()
    const [open, setOpen] = useState(false);
    const [subCats, setSubCats] = useState<string[]>(['']);
    const category = useMemo(() => params.get('category'), [params]);
    const categoryId = useMemo(() => params.get('categoryId'), [params]);

    useLayoutEffect(() => {
        if (params.get('action') === 'new_subcategory') {
            setOpen(true);
        } else {
            setOpen(false);
            setSubCats([]);
        }
    }, [params]);
    
    const [res, action] = useFormState(newSubCategory, {});
    useEffect(()=>{
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
                    <h2 className="font-bold text-black-500 text-center">Add a new sub-category</h2>
                    <form action={action} className="flex gap-4 flex-col">
                        <AppSelect {
                            ...{
                                name: 'categoryId',
                                value: categoryId ?? '',
                                options: [{
                                    title: category ?? 'Select category',
                                    value: categoryId ?? ''
                                }],
                                title: "Category",
                                readonly: true,
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
                                    key={i} title="Sub-category name" placeholder="Enter new sub-catergory" name="" />
                            ))
                        }
                        
                        <input type="hidden" name="subCategories" 
                        value={JSON.stringify(subCats.filter(i=>i.trim()))} />
                        <input type="hidden" name="categoryId" 
                        value={categoryId??""} />
                        <button
                            onClick={() => setSubCats(v => [...v, ''])}
                            type="button" role="button" className="inline-flex items-center py-2"
                        >{subCats.length > 0 ? "Add another +" : 'Add sub-category +'}</button>
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
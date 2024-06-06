/* eslint-disable @next/next/no-img-element */
'use client'

import { deleteService } from '@/actions';
import { Dialog } from '@radix-ui/themes'
import { useLayoutEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FormButton } from '../ui/FormButton';
import UserAuth from '../server/UserAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AppToast from '../Toast';


export default function DeleteServiceModal({ _id, title, description, coverPhoto }: { title: string; _id: string; description: string, coverPhoto:string }) {
    const {refresh} = useRouter();
    const [open, setOpen] = useState(false);
    const [res, action] = useFormState(deleteService, {});
    useLayoutEffect(() => {
        if (res.success) {
            toast(<AppToast.success message={res.success} />);
            setOpen(false);
        }else if(res.error){
            toast(<AppToast.error message={res.error} />);
        }
    }, [res])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <button className="delete-btn">
                    <RiDeleteBin6Line />
                    Delete
                </button>
            </Dialog.Trigger>
            <Dialog.Content style={{
                maxWidth: '500px',
            }}>
                <form action={action} className="flex flex-col gap-4">
                    <h2 className="font-semibold text-sm">Do you want to delete this post?</h2>
                    <div className="flex gap-2 border p-2 rounded">
                        <img src={coverPhoto} alt={title} className="profile-img rounded overflow-hidden h-20" />
                        <div>
                        <h2 className="font-bold text-black-700">{title}</h2>
                        <p className='text-black-400 line-clamp-3'>{description}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Dialog.Close><button className="btn-dark-border py-2 !text-body" role='button'>Cancel</button></Dialog.Close>
                        <FormButton className="delete-btn py-2 !border-danger !border" role='button'>Yes, Delete</FormButton>
                    </div>
                    <input type="hidden" name="_id" value={_id} />
                    <UserAuth />
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
'use client'
import { toggleAvailability } from '@/actions';
import AppToast from '@/components/Toast';
import UserAuth from '@/components/server/UserAuth';
import { useUserStore } from '@/state';
import { Switch } from '@radix-ui/themes'
import { useLayoutEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

export default function AvailableToggle() {
    const artisan = useUserStore(s => s.artisan)
    const setArtisan = useUserStore(s => s.setArtisan)
    const formRef = useRef<HTMLFormElement>(null)
    const [res, action] = useFormState(toggleAvailability, {});
    const [active, setActive] = useState(artisan?.available);

    function submitForm() {
        formRef.current?.requestSubmit();
    }


    useLayoutEffect(() => {
        if (res.success) {
            setArtisan(res.data);
            setActive(res.data.available)
        }else if(res.error) toast(<AppToast.error message={res.error} />)
    }, [res])

    return (
        <>
            <form action={action} ref={formRef}>
                <ActiveSwitch onChange={submitForm} active={active ?? false} />
                <UserAuth />
                <input type="hidden" name="value" value={`${!active}`} />
            </form>
        </>
    );
}

function ActiveSwitch({ onChange, active }: { onChange: () => void; active: boolean }) {
    const { pending } = useFormStatus();
    return (<Switch
        className={pending ? 'animate-pulse pointer-events-none' : 'cursor-pointer'}
        onClick={onChange}
        disabled={pending} onChange={() => { }} checked={active} />)
}
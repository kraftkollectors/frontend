'use client'
import { toggleAvailability } from '@/actions';
import UserAuth from '@/components/server/UserAuth';
import { debugLog } from '@/functions/helpers';
import { useUserStore } from '@/state';
import { Switch } from '@radix-ui/themes'
import { useLayoutEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function AvailableToggle() {
    const artisan = useUserStore(s => s.artisan)
    const user = useUserStore(s => s.user)
    const formRef = useRef<HTMLFormElement>(null)
    const [res, action] = useFormState(toggleAvailability, {});
    const [active, setActive] = useState(artisan?.isActive);

    function submitForm() {
        formRef.current?.requestSubmit();
    }

    debugLog(artisan);

    useLayoutEffect(() => {
        if (typeof res.data == 'boolean') {
            setActive(res.data)
        }
    }, [res])

    return (
        <>
            <form action={action} ref={formRef}>
                <ActiveSwitch onChange={submitForm} active={active ?? false} />
                <UserAuth />
                <input type="hidden" name="value" value={`${active}`} />
            </form>
        </>
    );
}

function ActiveSwitch({ onChange, active }: { onChange: () => void; active: boolean }) {
    const { pending } = useFormStatus();
    return (<Switch
        className={pending ? 'animate-pulse pointer-events-none' : ''}
        disabled={pending} onChange={onChange} checked={active} />)
}
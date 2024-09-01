
import { enableOrDisableUser } from "@/actions/admin";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import AppToast from "@/components/Toast";

export function useDisableOrEnableUser(isDisabled: boolean) {
    const [enabled, setEnabled] = useState(isDisabled);
    const [res, action] = useFormState(enableOrDisableUser, {});

    useEffect(() => {
        if (res.error) {
            toast(<AppToast.error message={res.error} />)
            return;
        } else if (res.success) {
            const active = res.data;
            setEnabled(active);
            toast(<AppToast.success message={!active ? "User has been blocked" : "User has been unblocked"} />)
            return;
        }
    }, [res]);

    return {
        enabled,
        action,
        setEnabled,
        res
    };
}

import { enableOrDisableService, enableOrDisableUser } from "@/actions/admin";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import AppToast from "@/components/Toast";

export function useDisableOrEnableService(isDisabled: boolean) {
    const [enabled, setEnabled] = useState(isDisabled);
    const [res, action] = useFormState(enableOrDisableService, {});

    useEffect(() => {
        if (res.error) {
            toast(<AppToast.error message={res.error} />)
            return;
        } else if (res.success) {
            const active = res.data;
            setEnabled(active);
            toast(<AppToast.success message={!active ? "Service has been blocked" : "Service has been unblocked"} />)
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
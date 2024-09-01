'use client'

import { FormButton } from "@/components";
import { AdminAuth } from "@/components/admin";
import { debugLog } from "@/functions/helpers";
import { useDisableOrEnableUser } from "@/hooks";
import { useParams } from "next/navigation";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";

export default function DisableButton({ active }: { active: boolean }) {
    const { slug } = useParams();
    const { enabled, action } = useDisableOrEnableUser(active);
    debugLog({active})

    return (
        <form action={action}>
            <FormButton className="inline-flex gap-2 text-light px-4 py-2 rounded-md bg-danger items-center hover:bg-danger-hover">
                <span>{!enabled ? "Unblock Account" : "Block Account"}</span>
                {!enabled ? <CgUnblock /> : <MdBlock />}
            </FormButton>
            <input type="hidden" name="userId" value={slug} />
            <input type="hidden" name="enable" value={`${!enabled}`} />
            <AdminAuth />
        </form>
    );
}

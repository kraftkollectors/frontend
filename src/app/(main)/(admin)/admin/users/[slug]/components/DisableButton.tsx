'use client'

import { FormButton } from "@/components";
import { MdBlock } from "react-icons/md";

export default function DisableButton() {
    return (
        <form>
            <FormButton className="inline-flex gap-2 text-light px-4 py-2 rounded-md bg-danger items-center hover:bg-danger-hover">
                <span>Block Account</span>
                <MdBlock />
            </FormButton>
        </form>
    );
}
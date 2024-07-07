'use client'

import { adminChangePassword } from "@/actions/admin";
import { FormButton, FormMessage } from "@/components";
import { AdminAuth, ListGroup } from "@/components/admin";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { useFormState } from "react-dom";

export default function ChangePassword() {
    const [res, action] = useFormState(adminChangePassword, {});
    
    return (
        <ListGroup
            title="Change Password"
            className="max-w-[500px]"
        >
            <form action={action}
                className="flex flex-col gap-4 [&_label]:font-semibold"
            >
                <FormMessage res={res} />
                {
                    formFields.map((field, index) => (
                        <AppInput
                            key={index}
                            {...field}
                            error={res.fieldErrors && res.fieldErrors[field.name]}
                        />
                    ))
                }
                <AdminAuth />
                <div className="flex justify-end">
                    <FormButton className="btn-dark-tiny flex-shrink-0 px-5 font-semibold py-2">Save changes</FormButton>
                </div>
            </form>
        </ListGroup>
    );
}

const formFields: AppInputProps[] = [
    {
        name: "oldPassword",
        placeholder: "Old password",
        title: "Old password"
    },
    {
        name: "password",
        placeholder: "New password",
        title: "New password"
    },
    {
        name: "confirmPassword",
        placeholder: "Retype password",
        title: "Retype password"
    },
]


'use client'

import { FormButton } from "@/components";
import { ListGroup } from "@/components/admin";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";

export default function ChangePassword() {
    return (
        <ListGroup
            title="Change Password"
            className="max-w-[500px]"
        >
            <form action=""
                className="flex flex-col gap-4 [&_label]:font-semibold"
            >
                {
                    formFields.map((field, index) => (
                        <AppInput
                            key={index}
                            {...field}
                        />
                    ))
                }
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
        name: "newPassword",
        placeholder: "New password",
        title: "New password"
    },
    {
        name: "rePassword",
        placeholder: "Retype password",
        title: "Retype password"
    },
]


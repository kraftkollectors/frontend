'use client'

export type AdminSearchProps<T extends () => any> = {
    action: T;
}

export default function AdminSearch({ action }: AdminSearchProps<any>) {
    return (
        <form action={action} className="flex gap-3 justify-stretch">
            <input placeholder="Enter your email to search " name="searchinput" className="p-2 flex-shrink grow md:w-80 border border-black-100 rounded outline-primary" />
            <button className="btn-dark-tiny flex-shrink-0 px-4">Search</button>
        </form>
    );
}
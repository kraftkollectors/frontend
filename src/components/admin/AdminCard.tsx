import { ReactNode } from "react";

export type AdminCardProps = {
    label: string;
    title: string;
    icon: ReactNode;
    children?: ReactNode;
    bg?: 'primary' | 'secondary'
}

export default function AdminCard({
    label, title, icon, children,
    bg = 'primary'
}:AdminCardProps) {
    const bgClass = bg === 'primary' ? 'bg-primary-lightActive' : 'bg-secondary-lightActive'
    
    return (
        <div className={`rounded-md p-4 flex flex-col gap-3 ${bgClass}`}>
            <div className="flex justify-between items-start">
                <h6 className=" text-label text-black-300 font-semibold">{label}</h6>
                <span className="inline-flex p-1.5 bg-light aspect-square justify-center items-center rounded-full">{icon}</span>
            </div>
            <h2 className="font-bold text-black-500 text-headline">{title}</h2>
            {children}
        </div>
    );
}
import { MdMyLocation } from "react-icons/md";

export default function NavLocationSelector({className = ''}: {className?: string}) {
    return (
        <div className={`relative flex gap-1 max-md:w-full items-center justify-stretch text-blak-300 px-1.5 font-semibold text-black-400 text-label
        ${className}`}>
            <MdMyLocation className="flex-shrink-0" />
            <input type="text" name="location" 
            defaultValue={"Lagos, Nigeria"}
            placeholder={"Lagos, Nigeria"}
            className="text-black-400 !border-none !outline-none flex max-md:!w-full py-1 md:!p-0 focus:!shadow-none focus:!border-none focus:!ring-transparent focus:!outline-none md:w-28 [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important]" />
        </div>
    );
}
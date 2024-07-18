import { useGoogleLocationInput } from "@/hooks";
import { MdMyLocation } from "react-icons/md";
import { GoogleLocation } from "../maps/GoogleLocationInput";
import { RefObject } from "react";

export default function NavLocationSelector({ className = '', location, setLocation, open, suggestionRef }: {
    className?: string;
    location?: GoogleLocation,
    setLocation: (v?: GoogleLocation) => void;
    open: boolean;
    suggestionRef: RefObject<HTMLDivElement>;
}) {
    const { setValue, handleSelect, data, isValid, value, setIsValid } = useGoogleLocationInput(setLocation, location);

    return (
        <>
            <div className={`relative flex gap-2 max-md:w-full items-center justify-stretch text-blak-300 px-1.5 font-semibold text-black-400 text-label
        ${className}`}>
                <MdMyLocation className="flex-shrink-0" />
                <input type="text" name="location"
                    onChange={(v) => {
                        setIsValid(false);
                        setValue(v.target.value);
                    }}
                    value={value}
                    placeholder={"Lagos, Nigeria"}
                    className="text-black-400 !border-none !outline-none flex max-md:!w-full py-1 md:!p-0 focus:!shadow-none focus:!border-none focus:!ring-transparent focus:!outline-none md:w-28 [outline:1px_solid_transparent!important] [all:unset] [box-shadow:none!important]" />
            </div>
            {
                data && open &&
                <div
                    className="absolute z-[0] w-full top-full shadow-[0_-2px_5px_#00000022] rounded-b left-0 p-2 bg-light">
                    <div
                        ref={suggestionRef}
                        id="ignore_search_click"
                        className="relative max-h-[200px] overflow-y-auto flex flex-col bg-light divide-y">
                        <button
                            role="button"
                            type="button"
                            className="py-1 text-start font-semibold text-label text-black-400"
                            onClick={() => { }}>
                            My Location
                        </button>
                        {data.map(item => (
                            <button
                                role="button"
                                type="button"
                                className="py-1 text-start font-semibold text-label text-black-400"
                                onClick={() => handleSelect(item.description)} key={item.place_id}>
                                {item.description}
                            </button>
                        ))}
                    </div>
                </div>}
        </>
    );
}
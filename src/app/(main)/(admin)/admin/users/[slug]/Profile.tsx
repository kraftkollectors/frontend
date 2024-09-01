/* eslint-disable @next/next/no-img-element */
import AppIcons from "@/components/AppIcons";
import { fallbackImage, fullName } from "@/functions/helpers";
import DisableButton from "./components/DisableButton";
import { UserDetails } from "@/utils/types/user";

export default function Profile({ userName, firstName, lastName, isArtisan, image, active }: UserDetails) {
    return (
        <div className="flex justify-between flex-wrap items-center grid-block gap-3">
            <div className="flex gap-4">
                <img src={fallbackImage(image)} alt={userName} height={80} width={80} className="avatar size-20 min-h-20 min-w-20" />
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-black-900">{fullName(firstName, lastName)}</h2>
                    <h3 className="text-black-400">@{userName}</h3>
                    {isArtisan && <p className="text-[#599f79] inline-flex items-center gap-2 text-small font-semibold">
                        Verified <AppIcons.Verified />
                    </p>}
                </div>
            </div>
            <DisableButton active={active} />
        </div>
    );
}
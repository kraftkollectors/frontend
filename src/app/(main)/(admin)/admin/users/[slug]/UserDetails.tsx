import { SocialIcons } from "@/components";
import { ListGroup } from "@/components/admin";
import { formatDate, formatTime } from "@/functions/date";
import { Artisan } from "@/utils/types/artisan";
import { UserDetails as UserDetailsType } from "@/utils/types/user";
import { ReactNode } from "react";
import { PiGlobe } from "react-icons/pi";

type DetailsProps = {
    title: string;
    children: ReactNode;
}

export default function UserDetails({user, artisan}:{
    user: UserDetailsType;
    artisan?: Artisan;
}) {
    const details:(DetailsProps | undefined)[] = [
        {
            title: 'Menber Since',
            children: formatDate(user.createdAt),
        },
        artisan && {
            title: 'Occupation',
            children: artisan.areaOfSpecialization,
        },
        {
            title: 'Social links',
            children: <div className="flex gap-2"><SocialIcons {...artisan} /></div>,
        },
        {
            title: 'Email',
            children: user.email,
        },
        artisan && {
            title: 'Availability',
            children: <div>
                {formatTime(artisan.workHourFrom)}
                <span> - </span>
                {formatTime(artisan.workHourTo)}
            </div>,
        },
        artisan && {
            title: 'Website',
            children: <a target="_blank" href={artisan.website} className="inline-flex gap-1 items-center">
            <PiGlobe />
            <span className="line-clamp-1">{artisan.website}</span>
        </a>
        },
        artisan && {
            title: 'Location',
            children: `${artisan.lga}, ${artisan.state}`,
        },
        artisan && {
            title: 'Phone Number',
            children: artisan.phoneNumber,
        },
    ]
    
    return (
        <ListGroup
            title="User Details"
            className=" col-span-1 lg:col-span-2"
        >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    details.filter(i=>i!=undefined).map(({title, children})=>(
                        <div key={title} className="flex flex-col gap-3">
                            <h4 className="text-black-200 font-semibold text-label">{title}</h4>
                            <div className="text-label text-black-400 font-semibold">{children}</div>
                        </div>
                    ))
                }
            </div>
        </ListGroup>
    );
}
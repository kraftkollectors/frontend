import { fetchUser } from "@/actions";
import { fetchSingleService } from "@/actions/fetch/fetchSingleService";
import { fullName } from "@/functions/helpers";

export async function UserCell({userId}:{userId: string;}) {
    const user = await fetchUser({isPublic: true, params: userId, throwsError: false});
    if(!user || user === 'error') return null;
    
    return (
        <div className="flex flex-col leading-tight">
          <h2>{fullName(user.firstName, user.lastName)}</h2>
          <p className="py-2">{user.email}</p>
        </div>
    );
}

export async function ServiceCell({serviceId}:{serviceId: string;}) {
    const service = await fetchSingleService(serviceId, {isPublic: true, throwsError: false});
    if(!service || service === 'error') return null;
    
    return (
        <div className="flex flex-col">
          <p> {service.title.split('').slice(0, 40).join('')}...</p>
          <p>{service.category} | {service.subCategory}</p>
        </div>
    );
}
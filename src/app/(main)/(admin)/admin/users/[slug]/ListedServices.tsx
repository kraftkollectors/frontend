import { fetchArtisanServices } from "@/actions";
import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";

export default async function ListedServices({userId}:{userId: string}) {
    const services = await fetchArtisanServices({ throwsError: false, params: userId, isPublic: true });
    if (services === 'error' || !services) return null;
    
    return (
        <ListGroup
            title="Listed Services"
            className=" col-span-1 lg:col-span-2"
        >
                {
                    services.existingRecords.length === 0 ? <div className="info-box">No services listed</div> :
                    services.existingRecords.map((service, i)=>(
                        <ListTile
                        key={service._id + i}
                        before={<AppIcons.RoundService />}
                        className="text-black-300 font-semibold text-label"
                        target='_blank'
                        href={paths.service(service._id)}
                        >
                            <h3>{service.title}</h3>
                            <p className="text-black-200">{service.category}</p>
                        </ListTile>
                    ))
                }
        </ListGroup>
    );
}
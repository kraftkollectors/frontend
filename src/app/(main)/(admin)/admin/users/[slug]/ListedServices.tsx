import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { dummyService } from "@/utils/dummy";

export default function ListedServices({userId}:{userId: string}) {
    const services = [dummyService, dummyService]
    
    return (
        <ListGroup
            title="Listed Services"
            className=" col-span-1 lg:col-span-2"
        >
                {
                    services.map((service, i)=>(
                        <ListTile
                        key={service._id + i}
                        before={<AppIcons.RoundService />}
                        className="text-black-300 font-semibold text-label"
                        href={paths.search(service._id)}
                        >
                            <h3>{service.title}</h3>
                            <p className="text-black-200">{service.category}</p>
                        </ListTile>
                    ))
                }
        </ListGroup>
    );
}
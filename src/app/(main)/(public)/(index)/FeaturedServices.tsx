import { fetchServices } from "@/actions";
import PostList from "../search/PostList";

export default async function FeaturedServices() {
    const services = await fetchServices({throwsError: false, isPublic: true});
    if(!services || services == 'error') return null;
    
    return (
        <>
        <div className="app-container pt-16 pb-4">
            <h3 className=" text-title font-bold text-center">Featured Services</h3>
        </div>
        <PostList services={services.existingRecords} />
        </>
    );
}
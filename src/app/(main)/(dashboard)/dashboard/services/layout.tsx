import { fetchUser } from "@/actions";
import { NotAnArtisan } from "@/components";

export default async function Layout({children}: {children: React.ReactNode}) {
    const user = await fetchUser();
    if(!user || user == 'error') return <div className="info-box">An Error Occurred</div>
    if(!user.isArtisan) return <NotAnArtisan />
  
    
    return (
        <>
            {children}
        </>
    );
}
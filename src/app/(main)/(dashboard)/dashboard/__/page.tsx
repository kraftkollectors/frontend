import { logout } from "@/actions"

export default async function Page(){
    await logout();
    
    return <></>
}
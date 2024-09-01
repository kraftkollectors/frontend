// import { GEOLOCATION_API } from "@/utils/constants";
import { Location } from "@/utils/types/location";
import { debugLog } from "./helpers";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''
export async function getDeviceLocation(): Promise<Location&{address:string} | null>{
    if (navigator.geolocation) {
        return new Promise<Location&{address:string} | null>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { longitude, latitude } = position.coords;
                    const q = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
                    const res = await q.json();
                    debugLog({res})
                    const address:string = res.results[0].formatted_address ?? 'Unknown Address';
                    resolve({ longitude: longitude.toString(), latitude: latitude.toString(), address });
                },
                (error) => {
                    console.log(error);
                    reject(null);
                }
            );
        });
    } else {
        return Promise.reject(null);
    }
}
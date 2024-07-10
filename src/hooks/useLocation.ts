import { GoogleLocation } from "@/components/maps/GoogleLocationInput";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

const libraries: Libraries = ['places'];


export function useLocation(value: GoogleLocation | undefined = undefined) {
    const [location, setLocation] = useState<GoogleLocation | undefined>(value);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '',
        libraries,
    });

    return { isLoaded, location, setLocation }
}
import { GoogleLocation } from "@/components/maps/GoogleLocationInput";
import AppToast from "@/components/Toast";
import { debugLog } from "@/functions/helpers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";


export function useGoogleLocationInput(onChange: (location?: GoogleLocation) => void, defaultValue?: GoogleLocation) {
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        setVal(defaultValue)
    }, [defaultValue])

    const [isValid, setIsValid] = useState(false);
    const { value, setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 800,
    })

    useEffect(() => {
        if (!isValid) onChange(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid])

    useEffect(() => {
        if (!val || !val.address) return;
        onChange(val);
        setIsValid(true);
        setValue(val.address, false)
        clearSuggestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [val])

    async function handleSelect(address: string) {
        setValue(address, false);
        clearSuggestions();

        const res = await getGeocode({ address });
        if (res.length < 1) return toast(AppToast.error({ message: "Failed to get location" }))
        const { lat, lng } = await getLatLng(res[0]);
        setIsValid(true);
        debugLog({ lat, lng, address });
        onChange({ address, latitude: lat, longitude: lng });
    }

    return {
        value,
        setValue,
        setIsValid,
        data,
        isValid,
        handleSelect,
        clearSuggestions,
    }
}
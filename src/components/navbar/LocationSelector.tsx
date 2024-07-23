import { useGoogleLocationInput } from "@/hooks";
import { MdMyLocation } from "react-icons/md";
import { GoogleLocation } from "../maps/GoogleLocationInput";
import { RefObject, useEffect, useRef, useState } from "react";
import { getDeviceLocation } from "@/functions/getDeviceLocation";
import { toast } from "react-toastify";
import AppToast from "../Toast";
import { locationToGoogleLocation } from "../ui/UseCurrentLocation";
import { getParentIds } from "@/functions/helpers";

export default function NavLocationSelector({
  className = "",
  location,
  setLocation,
}: {
  className?: string;
  location?: GoogleLocation;
  setLocation: (v?: GoogleLocation) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showMyLocation, setShowMyLocation] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue, handleSelect, data, isValid, value, setIsValid } =
    useGoogleLocationInput(setLocation, location);
  async function getLocation() {
    const location = await getDeviceLocation();
    if (!location) {
      toast(<AppToast.error message="Failed to get location" />);
      return;
    } else {
      setShowMyLocation(false);
      inputRef.current?.focus();
      setLocation(locationToGoogleLocation(location));
    }
  }

  useEffect(() => {
    // Function to handle click outside the excluded div
    const handleClickOutside = (event: MouseEvent) => {
      const parentIds = getParentIds(event.target);
      if (!parentIds.includes("ignore_search_click")) {
        // Click occurred outside the excluded div
        // debugLog('out click')
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mouseup", handleClickOutside);
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <div
        className={`text-blak-300 relative flex items-center justify-stretch gap-2 px-1.5 text-label font-semibold text-black-400 max-lg:w-full ${className}`}
      >
        <MdMyLocation className="flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          name="location"
          id="ignore_search_click"
          onChange={(v) => {
            setShowMyLocation(true);
            setIsValid(false);
            setValue(v.target.value);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          value={value}
          placeholder={"Lagos, Nigeria"}
          className="flex !border-none py-1 text-black-400 !outline-none [all:unset] [box-shadow:none!important] [outline:1px_solid_transparent!important] focus:!border-none focus:!shadow-none focus:!outline-none focus:!ring-transparent max-lg:!w-full lg:w-28 lg:!p-0"
        />
      </div>
      {data && open && (
        <div className="absolute left-0 top-full z-[0] w-full rounded-b bg-light p-2 shadow-[0_-2px_5px_#00000022]">
          <div
            id="ignore_search_click"
            className="relative flex max-h-[200px] flex-col divide-y overflow-y-auto bg-light"
          >
            {showMyLocation && (
              <button
                role="button"
                type="button"
                className="py-1 text-start text-label font-semibold text-black-400"
                onClick={getLocation}
              >
                My Location
              </button>
            )}
            {data.map((item) => (
              <button
                id="ignore_search_click"
                role="button"
                type="button"
                className="py-1 text-start text-label font-semibold text-black-400"
                onClick={() => {
                  handleSelect(item.description);
                  inputRef.current?.focus();
                }}
                key={item.place_id}
              >
                {item.description}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

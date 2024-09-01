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
      if (!parentIds.includes("ignore_location_click")) {
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
          id="ignore_location_click"
          onChange={(v) => {
            setShowMyLocation(true);
            setIsValid(false);
            setValue(v.target.value);
          }}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          // onBlur={() => setOpen(false)}
          value={value}
          placeholder={"Enter Location"}
          className="flex !border-none py-1 text-black-400 !outline-none [all:unset] [box-shadow:none!important] [outline:1px_solid_transparent!important] focus:!border-none focus:!shadow-none focus:!outline-none focus:!ring-transparent max-lg:!w-full lg:w-28 lg:!p-0"
        />
      </div>
      {((data && data.length > 0) || showMyLocation) && open && (
        <div
          id="ignore_location_click"
          className="location-popover lg:max-w-40 lg:translate-x-2"
        >
          {showMyLocation && (
            <button
              role="button"
              type="button"
              className="btn-location !text-primary"
              onClick={getLocation}
            >
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.60016 12.867C2.81234 12.8051 3.0404 12.83 3.23419 12.9363C3.42798 13.0426 3.57161 13.2215 3.6335 13.4337C3.69538 13.6458 3.67044 13.8739 3.56417 14.0677C3.4579 14.2615 3.279 14.4051 3.06683 14.467C2.65016 14.5887 2.35016 14.717 2.15766 14.8337C2.356 14.9528 2.66933 15.0862 3.10433 15.2103C4.06683 15.4853 5.44433 15.667 7.00016 15.667C8.55599 15.667 9.93349 15.4853 10.896 15.2103C11.3318 15.0862 11.6443 14.9528 11.8427 14.8337C11.651 14.717 11.351 14.5887 10.9343 14.467C10.7255 14.4024 10.5504 14.2583 10.4468 14.0658C10.3432 13.8733 10.3194 13.6478 10.3805 13.4379C10.4416 13.2281 10.5828 13.0506 10.7735 12.9438C10.9642 12.837 11.1893 12.8094 11.4002 12.867C11.9568 13.0295 12.4668 13.2378 12.8585 13.5053C13.221 13.7545 13.6668 14.1887 13.6668 14.8337C13.6668 15.4862 13.2102 15.9237 12.8418 16.1728C12.4435 16.4412 11.9227 16.6503 11.3535 16.8128C10.2052 17.142 8.66683 17.3337 7.00016 17.3337C5.3335 17.3337 3.79516 17.142 2.64683 16.8128C2.07766 16.6503 1.55683 16.4412 1.1585 16.1728C0.790163 15.9228 0.333496 15.4862 0.333496 14.8337C0.333496 14.1887 0.779329 13.7545 1.14183 13.5053C1.5335 13.2378 2.0435 13.0295 2.60016 12.867ZM7.00016 0.666992C8.65777 0.666992 10.2475 1.32547 11.4196 2.49757C12.5917 3.66968 13.2502 5.25939 13.2502 6.91699C13.2502 9.05699 12.0835 10.797 10.8752 12.0337C10.3948 12.5203 9.87866 12.9701 9.331 13.3795C8.836 13.7512 7.70433 14.4478 7.70433 14.4478C7.48969 14.5698 7.24705 14.634 7.00016 14.634C6.75328 14.634 6.51063 14.5698 6.296 14.4478C5.73438 14.1222 5.19132 13.7655 4.66933 13.3795C4.12086 12.9711 3.60461 12.5212 3.12516 12.0337C1.91683 10.797 0.750163 9.05699 0.750163 6.91699C0.750163 5.25939 1.40864 3.66968 2.58075 2.49757C3.75285 1.32547 5.34256 0.666992 7.00016 0.666992ZM7.00016 2.33366C5.78459 2.33366 4.6188 2.81654 3.75926 3.67609C2.89971 4.53563 2.41683 5.70142 2.41683 6.91699C2.41683 8.43032 3.24683 9.77366 4.31683 10.867C5.12183 11.6903 6.0085 12.317 6.62266 12.702L7.00016 12.9303L7.37766 12.702C7.991 12.317 8.8785 11.6903 9.6835 10.8678C10.7535 9.77366 11.5835 8.43116 11.5835 6.91699C11.5835 5.70142 11.1006 4.53563 10.2411 3.67609C9.38153 2.81654 8.21574 2.33366 7.00016 2.33366ZM7.00016 4.41699C7.32847 4.41699 7.65356 4.48166 7.95687 4.60729C8.26018 4.73293 8.53578 4.91708 8.76793 5.14922C9.00008 5.38137 9.18422 5.65697 9.30986 5.96028C9.4355 6.2636 9.50016 6.58869 9.50016 6.91699C9.50016 7.2453 9.4355 7.57039 9.30986 7.8737C9.18422 8.17701 9.00008 8.45261 8.76793 8.68476C8.53578 8.9169 8.26018 9.10105 7.95687 9.22669C7.65356 9.35233 7.32847 9.41699 7.00016 9.41699C6.33712 9.41699 5.70124 9.1536 5.2324 8.68476C4.76355 8.21592 4.50016 7.58003 4.50016 6.91699C4.50016 6.25395 4.76355 5.61807 5.2324 5.14922C5.70124 4.68038 6.33712 4.41699 7.00016 4.41699ZM7.00016 6.08366C6.77915 6.08366 6.56719 6.17146 6.41091 6.32774C6.25463 6.48402 6.16683 6.69598 6.16683 6.91699C6.16683 7.138 6.25463 7.34997 6.41091 7.50625C6.56719 7.66253 6.77915 7.75032 7.00016 7.75032C7.22118 7.75032 7.43314 7.66253 7.58942 7.50625C7.7457 7.34997 7.8335 7.138 7.8335 6.91699C7.8335 6.69598 7.7457 6.48402 7.58942 6.32774C7.43314 6.17146 7.22118 6.08366 7.00016 6.08366Z"
                  fill="currentColor"
                />
              </svg>
              My Location
            </button>
          )}
          {data.map((item) => (
            <button
              id="ignore_location_click"
              role="button"
              type="button"
              className="btn-location"
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
      )}
    </>
  );
}

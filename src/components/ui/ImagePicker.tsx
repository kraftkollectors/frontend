/* eslint-disable @next/next/no-img-element */
'use client'

import { CiCamera } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa6";

type ImagePickerProps = {
  big?: boolean;
  onHasValueChange?: (hasValue: boolean) => void;
  placeholder?: string | null;
  name?: string;
}

export function ImagePicker({ big = false, onHasValueChange, placeholder = null, name = "file" }: ImagePickerProps) {
  const defaultImg: string = placeholder ?? "/images/user-avatar.png";
  const [selectedImage, setImage] = useState<string | null>(placeholder);
  const inputRef = useRef<HTMLInputElement>(null)
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e2) => {
        setImage(e2?.target?.result as string);
      };
      reader.readAsDataURL(file);
      if (onHasValueChange) onHasValueChange(true)
    }
  }
  useEffect(() => {
    if (onHasValueChange) onHasValueChange(false);
  }, []);

  return (
    <div className=" relative flex justify-center items-center w-fit">
      <label
        htmlFor="image-select"
        className=" rounded-full bg-black-200  relative size-28 flex justify-center items-center"
      >
        {
          selectedImage &&
          <button
            onClick={() => {
              if (inputRef.current)
                inputRef.current.value = "";
              setImage(null);
              if (onHasValueChange) onHasValueChange(false)
            }}
            className="rounded-lg bg-red-800 text-red-100 shadow p-2 bottom-0 right-0 inline-block absolute z-[2]">
            <FaTrash />
          </button>}
        <img src={selectedImage ?? defaultImg} alt="" className="h-full w-full rounded-full z-[1] object-cover overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <CiCamera className=" text-black top-2  h-5 w-5 flex justify-center items-center" />
      </label>
      <input type="hidden" value={!!selectedImage ? 'false' : 'true'} name="delete" className='hidden' hidden />
      <input

        ref={inputRef}
        className="hidden"
        name={name}
        accept="image/*"
        type="file"
        id="image-select"
        onChange={handleImageChange} />
    </div>
  );
}

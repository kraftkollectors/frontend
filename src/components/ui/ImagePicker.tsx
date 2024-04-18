import { CiCamera } from "react-icons/ci";

export function ImagePicker() {
  return (
    <div className=" relative">
      <input type="file" name="file" id="file" className="hidden" />
      <label
        htmlFor="file"
        className=" rounded-full  bg-black-200  relative size-28 flex  justify-center items-center"
      >
        <CiCamera className=" text-black top-2  h-5 w-5 flex justify-center items-center" />
      </label>
    </div>
  );
}

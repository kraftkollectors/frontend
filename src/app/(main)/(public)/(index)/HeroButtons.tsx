import { FaSearch } from "react-icons/fa";

export default function HeroButton() {
  return (
    <div className=" flex justify-center items-center gap-3 max-md:hidden">
     {
        buttonContents.map(buttonContent =>
            <button key={buttonContent} className=" bg-[#fff3] hover:bg-[#fff8] text-light items-center backdrop-blur-sm rounded-lg p-2 w-fit gap-2 text-label inline-flex">
            <FaSearch />
            {buttonContent}
          </button>
        )
     }
    </div>
  );
}

const buttonContents = ["Vent Planning", "Event Planning", "Home Needs"];

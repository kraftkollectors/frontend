import { FormButton } from "@/components";
import { GrFormAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";

export function ChatBottombar() {
  return (
    <div className="flex gap-2 md:gap-4 p-4">
      <div className="relative">
        <label htmlFor="file-select" className="block icon-btn text-title p-2">
          <GrFormAttachment />
        </label>
        <input type="file" hidden name="file" id="file-select" />
      </div>
      <div className="w-full bg-red-300 relative">
        <div className="absolute bottom-0 left-0 w-full bg-red-100 max-h-40 flex flex-col">
          <textarea
            placeholder="enter message"
            rows={1}
            className="focus:outline-primary focus:outline rounded-md !border-none !outline-none focus:h-32 w-full focus:shadow-lg"
          />
        </div>
      </div>
      <FormButton className="icon-btn p-2">
        <VscSend />
      </FormButton>
    </div>
  );
}

import { GrFormAttachment } from "react-icons/gr";

export function ChatBottombar() {
  return (
    <div className="flex gap-2 md:gap-4 p-4">
      <div className="relative">
        <label htmlFor="file-select block icon-btn">
          <GrFormAttachment />
        </label>
        <input type="file" hidden name="file" id="file-select" />
      </div>
    </div>
  );
}

import { MdOutlineUpload } from "react-icons/md";

export type AppFilePickerProps = {
  title: string;
  subtitle?: string;
};

export default function AppFilePicker({ title, subtitle }: AppFilePickerProps) {
  return (
    <div className="flex items-center flex-col border border-dotted border-gray-400 rounded h-24 w-full justify-center">
      <h1 className="flex items-center text-label text-primary">
        <MdOutlineUpload />
        {title}
      </h1>
      <p className="text-small text-[#929292]">{subtitle}</p>
    </div>
  );
}

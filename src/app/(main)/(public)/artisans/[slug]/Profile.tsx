import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export type ProfileProps = {
  skills: string[];
  img: string;
  name: string;
  location: string;
  title: string;
};
export default function Profile({
  skills,
  name,
  img,
  location,
  title
}: ProfileProps) {
  return (
    <div className="md:col-span-4 flex flex-col gap-3">
      <div className="flex gap-4 max-md:flex-col max-md:items-center  max-md:border-b max-md:pb-4">
        <Image
          height={200}
          width={200}
          src={img}
          alt={name}
          className="avatar size-20 md:size-30"
        />
        <div className="flex flex-col gap-1 max-md:items-center max-md:text-center">
          <h1 className="r-font-bold r-text-lg">
            {name}
          </h1>
          <h2 className="text-dark-gray text-xs">
            {title}
          </h2>
          <h3 className="flex gap-1 text-xs text-dark-gray">
            <FaLocationDot />
            <span>
              {location}
            </span>
          </h3>
          <p className="text-dark-gray text-xs">Member since April 25, 2020</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-md:py-3 max-md:border-b">
        <h1 className="r-font-semibold text-sm">Skills</h1>
        <div className="flex gap-1 flex-wrap">
          {skills.map(skill =>
            <div key={skill} className="skill-btn">
              {skill}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { FaRegEdit } from "react-icons/fa";
import ProfileCategory from "./ProfileCategory";

export default function Description() {
    return (
        <ProfileCategory
        title="Away Message"
        action={
          <button className="edit-btn">
            <FaRegEdit /> Edit
          </button>
        }
      >
        <p className="text-black-400">{"awayMessage"}</p>
      </ProfileCategory>
    );
}
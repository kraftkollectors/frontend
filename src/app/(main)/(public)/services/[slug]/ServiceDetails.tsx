import { RatingStars, ReadMoreReadLess } from "@/components";
import { FaHeart } from "react-icons/fa6";

export default function ServiceDetails() {
  return (
    <div className="flex flex-col gap-3 py-5 pb-4 border-b">
      <h1 className="font-bold text-title md:text-xl">
        I will make your event a blossom and it will be good
      </h1>
      <div className="flex justify-between gap-4 border-b pb-4">
        <p className="text-primary r-font-semibold text-title">$ 100</p>
        <div className="flex w-fit gap-2 items-center">
          <p className="text-dark-gray r-font-semibold text-label">4.8</p>
          <RatingStars value={4.8} size="md" />
          <button className="size-8 rounded-md shadow inline-flex items-center justify-center bg-light">
            <FaHeart />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold">Service Description</h1>
        <ReadMoreReadLess className="text-black-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          voluptatum, sit distinctio, dolor architecto, necessitatibus nam
          tenetur quidem blanditiis fugit nulla quod veniam repellat laudantium
          veritatis eum! Incidunt doloremque illo ab tenetur sint ipsam nemo
          culpa, similique dicta quae, beatae totam, esse laboriosam eos.
          Similique ullam reprehenderit quis, rerum fugiat delectus eaque beatae
          sed debitis, amet ad sapiente voluptate. Saepe ipsa cupiditate rem
          dolorum eligendi voluptatibus ducimus distinctio, veniam soluta
          perspiciatis nulla consectetur porro adipisci optio eius! Magnam
          ullam, corporis nisi, nobis ab sint recusandae atque perspiciatis
          officiis porro neque totam optio quibusdam reprehenderit explicabo id
          dolorum dolor dolores alias. Totam temporibus dolor, doloremque
          excepturi, similique quisquam asperiores ad sequi numquam, magni Hic.
        </ReadMoreReadLess>
      </div>
    </div>
  );
}

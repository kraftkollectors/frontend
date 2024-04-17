"use client";
import AppInput from "@/components/ui/AppInput";
import Rating from "@/components/ui/Rating";
import { Theme, AlertDialog } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
export default function WriteReview() {
  return (
    // <Theme>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button className="btn-dark-border p-2"> Write a review</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <form className=" flex flex-col gap-3 text-center items-center">
          <div className="flex justify-between w-full">
            <h1></h1>
            <h1 className="text-center text-title font-semibold">
              Rate service
            </h1>
            <AlertDialog.Cancel>
              <IoClose />
            </AlertDialog.Cancel>
          </div>

          <p>
            Kindly provide genuine feedback to benefit both future customers and
            the artisan in attracting more clients.
          </p>
          <div className="text-headline text-secondary flex gap-1 justify-center py-4">
            <Rating />
          </div>
          <div className="w-full">
            <AppInput
              placeholder="Write Review"
              type="text"
              textarea
              name="review"
            />
          </div>
          <button className="btn-dark-tiny py-2 max-md:w-full px-6">
            Submit
          </button>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

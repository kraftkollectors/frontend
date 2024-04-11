"use client";

import { FormButton } from "@/components";
import AppCheckTile from "@/components/ui/AppCheckTile";

export default function Form() {
  return (
    <form className="flex flex-col gap-4">
      <AppCheckTile name="system" title="System notifications" />
      <AppCheckTile name="messages" title="Messages" />
      <AppCheckTile name="reviews" title="Reviews" />
      <div className=" flex justify-end items-center">
        <FormButton className="btn-primary px-6 max-sm:w-full">
          Save Changes
        </FormButton>
      </div>
    </form>
  );
}

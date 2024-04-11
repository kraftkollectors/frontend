"use client";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, SocialIcons } from "@/components";
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-3 py-3 ">
      <div className="grid md:grid-cols-2 gap-4">
        {contactFields.map((item) => {
          return item.textarea ? (
            <div key={item.name} className="col-span-full">
              <AppInput {...item} />
            </div>
          ) : (
            <AppInput key={item.name} {...item} />
          );
        })}
      </div>
      <div className="flex justify-between max-md:flex-col-reverse gap-4">
        <FormButton className="btn-primary w-full md:w-40">
          Send Message
        </FormButton>{" "}
        <div className="gap-2 flex items-center">
          <p className="whitespace-nowrap">our socials</p>
          <div className="w-full flex-shrink md:hidde"></div>
          <SocialIcons facebook="h" x="m" linkedin="a" instagram="a" />
        </div>
      </div>
    </form>
  );
}

const contactFields: AppInputProps[] = [
  {
    name: "email",
    title: "Email Address",
    type: "email",
    placeholder: "Email Address",
  },
  {
    name: "name",
    title: "Name",
    type: "text",
    placeholder: "Name",
  },
  {
    name: "phone",
    title: "Phone",
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    name: "subject",
    title: "Subject",
    type: "text",
    placeholder: "Subject",
  },
  {
    name: "message",
    title: "Message",
    textarea: true,
    placeholder: "Write message",
  },
];

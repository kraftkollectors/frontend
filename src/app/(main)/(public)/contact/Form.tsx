"use client";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage, SocialIcons } from "@/components";
import { useFormState } from "react-dom";
import { contactSupport } from "@/actions";
import { useLayoutEffect, useMemo, useState } from "react";
import { paths } from "@/utils";
import { useUserStore } from "@/state";
import { fullName } from "@/functions/helpers";

export default function ContactForm() {
  const user = useUserStore(s=>s.user);
  const [formKey, setFormKey] = useState('-');
  const [res, action] = useFormState(contactSupport, {});
  useLayoutEffect(()=>{
    if(!res.success) return;
    setFormKey(formKey+'-');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res])

  const contactFields: AppInputProps[] = useMemo(()=> [
    {
      name: "email",
      title: "Email Address",
      type: "email",
      placeholder: "Email Address",
      value: user?.email
    },
    {
      name: "name",
      title: "Name",
      type: "text",
      placeholder: "Name",
      value: fullName(user?.firstName, user?.lastName)
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
  ], [user]);
  
  
  return (
    <form key={formKey} action={action} className="flex flex-col gap-4 py-3 ">
      <FormMessage res={res} />
      <div className="grid md:grid-cols-2 gap-4">
        {contactFields.map((item) => {
          return item.textarea ? (
            <div key={item.name} className="col-span-full">
              <AppInput {...item} error={res.fieldErrors ? (res.fieldErrors as any)[item.name] : ''} />
            </div>
          ) : (
            <AppInput 
            key={item.name} {...item} error={res.fieldErrors ? (res.fieldErrors as any)[item.name] : ''} />
          );
        })}
      </div>
      <div className="flex justify-between max-md:flex-col-reverse gap-8">
        <FormButton className="btn-primary w-full md:w-40">
          Send Message
        </FormButton>
        <div className="gap-2 flex items-center">
          <p className="whitespace-nowrap font-semibold">our socials</p>
          <div className="w-full flex-shrink md:hidden"></div>
          <SocialIcons facebook={paths.facebook} twitter={paths.twitter} linkedin={paths.linkedin} instagram={paths.instagram} />
        </div>
      </div>
    </form>
  );
}


import ContactForm from "./Form";
export default function Page() {
  return (
    <main className="flex items-center justify-center  py-10 app-container bg-light-text">
      <div className="flex flex-col gap-2 max-w-[700px]  p-5 md:border rounded-md md:bg-light border-black-50">
        <h1 className="text-title r-font-bold">Contact Kraftkollectors</h1>
        <p className="r-text-sm opacity-70">
          Have a question or need assistance? Were here to help! Reach out to us
          using the form below, and we ll get back to you as soon as possible.
          Your satisfaction is our priority.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}

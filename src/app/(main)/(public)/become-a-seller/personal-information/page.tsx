import EducationForm from "./EducationForm";

export default function Educationpage() {
  return (
    <div className="app-container py-10 bg-light-text">
      <div className="flex flex-col gap-2">
        <p>step 2 of 3</p>
        <div className="flex gap-2">
          <div className="bg-primary rounded w-12 h-2"></div>
          <div className="bg-primary rounded w-12 h-2"></div>
          <div className="bg-light rounded w-12 h-2"></div>
        </div>

        <h1 className="text-title font-semibold text-black-800">
          Personal Information
        </h1>
        <p className="text-black-300 text-body">
          Fill in the information below
        </p>
      </div>

      <EducationForm />
    </div>
  );
}

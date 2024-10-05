import DeleteAccountModal from "./DeleteModal";

export default function page() {
  return (
    <section className="col-span-7 mx-auto w-full max-w-[700px] overflow-hidden rounded-lg border border-black-50 bg-light shadow-[0_0_40px_5px_#358FAB14]">
      <div className="border-b border-black-50 bg-[#FAFAFA] px-4 py-2.5 md:px-5">
        <h3 className="text-sm font-semibold text-danger">Account Deletion</h3>
      </div>
      <div className="p-4 md:p-6">
        <p className="pb-4 text-sm">
          Deleting your account is a{" "}
          <span className="font-semibold">serious and irreversible</span>{" "}
          action. By proceeding, you will{" "}
          <span className="font-semibold">permanently</span> lose access to your
          account, and all of your personal data will be deleted from our
          systems. This includes your profile information, posts, saved
          preferences, interactions, and any other personal data associated with
          your account.
        </p>
        <p className="pb-4 text-sm">
          Once your account is deleted, this action{" "}
          <span className="font-semibold">cannot be undone</span>, and your data
          will <span className="font-semibold">no longer be recoverable</span>.
          If you&apos;re certain you wish to delete your account and understand
          the implications of doing so, please proceed with caution.
        </p>
        <div className="flex justify-end">
          <DeleteAccountModal>
            <button className="btn-primary !border-danger !bg-danger px-6 py-2 text-sm max-md:w-full">
              Delete Account
            </button>
          </DeleteAccountModal>
        </div>
      </div>
    </section>
  );
}

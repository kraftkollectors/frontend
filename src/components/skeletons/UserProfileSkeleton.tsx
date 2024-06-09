export default function UserProfileSkeleton() {
    return (
        <div className="skeleton h-96 w-full flex items-center p-10 flex-col gap-4">
            <div className="avatar skeleton size-28"></div>
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="skeleton h-8 w-full"></div>
              <div className="skeleton h-8 w-full"></div>
            </div>
          </div>
    );
}
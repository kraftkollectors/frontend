export default function Loading() {
    return (
        <div className="flex flex-col gap-6 items-start">
            <div className="skeleton h-6 w-40"></div>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="skeleton h-20 w-full"></div>
                <div className="skeleton h-20 w-full"></div>
            </div>
            <div className="skeleton h-40 w-full"></div>
        </div>
    );
}
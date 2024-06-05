"use client"
import { useEffect } from "react"

export default function Error({
     error,
     reset
}: {
     error: Error & { digest?: string },
     reset: () => void
}) {

     useEffect(() => {
         console.error(error)
     },[error])


    return (
        <section className="h-screen w-full flex flex-col gap-6 justify-center items-center app-container">
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-3xl font-bold max-w-[400px]">{error.message}</p>
            <button className="btn-primary px-8 !py-2" onClick={reset}>
                 Try again
            </button>
        </section>
    );
}
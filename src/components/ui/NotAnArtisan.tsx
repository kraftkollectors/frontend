import Link from 'next/link';
import {paths} from '@/utils'

export function NotAnArtisan() {
    return (
        <div className="flex flex-col gap-6 p-6 justify-center items-center w-full">
            <h2 className="font-semibold text-center text-black-700">You are not an artisan</h2>
            <Link href={paths.becomeASeller} className="btn-primary py-3 w-40">Become an artisan</Link>
        </div>
    );
}
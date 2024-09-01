import { HOST } from "@/utils/constants";
import { Metadata } from "next";

export type MetadataProps = {
    title: string;
    description: string;
    img?: string;
    path?: string;
}

export function staticMetadata({ title, description, img, path }: MetadataProps): Metadata {
    const keywords = ["kraftkollectors", "services", "artisans", ...title.split(' '), ...description.split(' ')];
    const buildImg = img ? (img.startsWith('/') ? HOST+img : img) : '/images/banners/default.png';

    return {
        title,
        description,
        metadataBase: new URL(HOST),
        icons: ["/images/icon.png"],
        appleWebApp: { capable: true, title: "KraftKollectors", startupImage: ["/images/banners/splash.png"] },
        applicationName: "KraftKollectors",
        keywords: keywords,
        manifest: "/files/manifest.json",
        twitter: { title, description, images: [buildImg] },
        openGraph: {
            title,
            description,
            images: [buildImg],
            tags: keywords,
        },

    }
}
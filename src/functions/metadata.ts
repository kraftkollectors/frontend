import { HOST } from "@/utils/constants";
import { Metadata } from "next";

export type MetadataProps = {
    title: string;
    description: string;
    img?: string;
    path?: string;
}

export function staticMetadata({ title, description, img = '/images/banners/default.png', path }: MetadataProps): Metadata {
    const keywords = ["kraftkollectors", "services", "artisans", ...title.split(' '), ...description.split(' ')];

    return {
        title,
        description,
        metadataBase: new URL(HOST),
        appleWebApp: { capable: true, title: "KraftKollectors", startupImage: ["/images/banners/splash.png"] },
        applicationName: "KraftKollectors",
        keywords: keywords,
        manifest: "/files/manifest.json",
        twitter: { title, description, images: [HOST + img] },
        openGraph: {
            title,
            description,
            images: [HOST + img],
            tags: keywords,
        },

    }
}
'use client'

import useWindowWidth from "@/hooks/useWindowWidth";
import { ReactNode } from "react";

export type DashboardPageProps = {
    services: ReactNode;
    home: ReactNode;
}

export default function DashboardPage({home, services}: DashboardPageProps) {
    const vw = useWindowWidth();
    return (
        <>
        {
            vw > 768 ?  services : home
        }
        </>
    );
}
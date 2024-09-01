'use client'

import { AppLayoutProps } from "@/utils/types/basicTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();
export default function ReactQueryClient({children}:AppLayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
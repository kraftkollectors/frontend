import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "@/assets/globals.css";
import "@/assets/fonts.css";
import { Theme } from "@radix-ui/themes";
import AuthProvider from "@/components/server/AuthProvider";
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@/utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryClient from "./ReactQueryClient";
import PreloadUrls from "@/components/server/PreloadUrls";
import { staticMetadata } from "@/functions/metadata";
import ResizeHandler from "./ResizeHandler";

export const metadata: Metadata = staticMetadata({
  title: "KraftKollectors | Find Professionals Nearby",
  description: "Linking You to the Best Artisans and Experts in Your Area",
});

// export const dynamic = 'force-static';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <AuthProvider />
      </Suspense>
      <body className={`bg-light text-body font-normal text-black-800`}>
        <ResizeHandler />
        <ReactQueryClient>
          <Theme>
            <PreloadUrls
              urls={[
                "/fonts/Eina01-Bold/Web Fonts/2d57f676e3d6955778fb8acac0176b9a.woff2",
                "/fonts/Eina01-Regular/Web Fonts/1868e326d3ee28e5395f6efa2bc037bf.woff2",
                "/fonts/Eina01-SemiBold/Web Fonts/032d6b2c34344e22d2cbca6b7050d642.woff2",
                "https://fonts.cdnfonts.com/css/sf-pro-display",
              ]}
            />
            <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
              {children}
            </GoogleOAuthProvider>
          </Theme>
          <ToastContainer stacked hideProgressBar toastClassName={"toast"} />
        </ReactQueryClient>
      </body>
    </html>
  );
}

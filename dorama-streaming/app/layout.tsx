import type { Metadata } from "next";

import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Dorama Streaming",
  description: "Assista seus doramas favoritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
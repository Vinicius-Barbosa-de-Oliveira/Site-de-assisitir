import type { Metadata } from "next";

import "./globals.css";

import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Dorama Streaming",
  description: "Streaming de Doramas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">

      <body>

        <SessionProvider>
          {children}
        </SessionProvider>

      </body>

    </html>
  );

}
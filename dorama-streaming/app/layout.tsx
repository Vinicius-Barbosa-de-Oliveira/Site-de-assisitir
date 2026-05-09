import "./globals.css";

import Provider from "@/providers/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="pt-BR">

      <body>

        <Provider>

          {children}

        </Provider>

      </body>

    </html>

  );

}
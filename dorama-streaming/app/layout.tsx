import "./globals.css";

export const metadata = {
  title: "Dorama Streaming",
  description: "Streaming de doramas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
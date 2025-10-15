import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import "@fontsource/cormorant-garamond/700.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
//  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>

export const metadata: Metadata = {
  title: "Formulario de Incripción - Desafio Neurovascular 2025",
  description:
    "¡Inscríbete y forma parte de la magia de &quot;Cine el Origen&quot;!",
  icons: {
    icon: "logo-colni-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="es">
      <body className={` antialiased`}>
        {children}
        <Toaster richColors position="top-center" expand />
      </body>
    </html>
  );
}

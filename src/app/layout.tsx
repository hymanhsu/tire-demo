import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/components/web-vitals";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tire of Crestmont",
  description: "Tire of Crestmont",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Tire of Crestmont</title>
      </head>
      <body className={inter.className}>
        <main>
          <WebVitals />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}

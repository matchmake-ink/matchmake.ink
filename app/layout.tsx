import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "New Application",
  description: "A brand new Next App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-normal text-text">
        <Header />
        <>{children}</>
      </body>
    </html>
  );
}

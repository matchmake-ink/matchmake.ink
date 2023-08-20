import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import RootLayout from "@/layouts/root";

export const metadata: Metadata = {
  title: "New Application",
  description: "A brand new Next App",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background-normal text-text">
        <RootLayout>
          <Header />
          <>{children}</>
        </RootLayout>
      </body>
    </html>
  );
}

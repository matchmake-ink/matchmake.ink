import "./globals.css";
import type { Metadata } from "next";
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
          <>{children}</>
        </RootLayout>
      </body>
    </html>
  );
}

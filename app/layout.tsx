import { Header } from "@/components/header/Header";
import "./globals.css";
import { Rubik } from "next/font/google";
const font = Rubik({
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "matchmake.ink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

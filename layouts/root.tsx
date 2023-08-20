"use client";
import { StateContextProvider } from "@/lib/client/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StateContextProvider>{children}</StateContextProvider>;
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/client/auth";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userLoading, userError } = useUser();

  useEffect(() => {
    if (userLoading) return;

    if (user === null || userError) {
      router.push("/");
    }
  }, [router, userLoading, user, userError]);
  return (
    <>
      <Header />
      <div className="flex flex-row h-page">
        <Sidebar />
        <main className="w-3/4 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}

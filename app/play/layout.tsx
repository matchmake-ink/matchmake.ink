"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/client/auth";
import Sidebar from "@/components/sidebar";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userLoading, userError } = useUser();

  useEffect(() => {
    console.log(user, userLoading, userError);
    if (userLoading) return;

    if (user === null || userError) {
      router.push("/auth");
    }
  }, [router, userLoading, user, userError]);
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

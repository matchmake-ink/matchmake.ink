"use client";
import { CreateTeam, UpdateTeam } from "@/components/team";
import StandardLayout from "@/layouts/standard";

export default function Home() {
  return (
    <StandardLayout>
      <CreateTeam />
      <UpdateTeam />
    </StandardLayout>
  );
}

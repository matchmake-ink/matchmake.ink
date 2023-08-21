"use client";
import { CreateTeam, UpdateTeam } from "@/components/team";

export default function Home() {
  return (
    <main>
      <CreateTeam />
      <UpdateTeam />
    </main>
  );
}

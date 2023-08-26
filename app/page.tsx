"use client";
import { CreateTeam, UpdateTeam } from "@/components/team";
import StandardLayout from "@/layouts/standard";
import Button from "@/components/button";

export default function Home() {
  return (
    <StandardLayout>
      <CreateTeam />
      <UpdateTeam />
      <Button
        onClick={async () => {
          const res = await fetch("/api/profile", {
            method: "GET",
            body: JSON.stringify({
              uid: "6HqeUsUpjsQgGuhPh2Gi9S7bwSD3",
            }),
          });

          console.log(res);
          console.log(res.clone().json());
        }}
        label="fetch thing"
      />
    </StandardLayout>
  );
}

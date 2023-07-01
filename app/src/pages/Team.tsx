import { redirect } from "react-router-dom";
import { useEffect } from "react";
import { getMyTeam } from "@/api/get-team";

// function onlt redirects to different pages
export default function Team() {
  useEffect(() => {
    getMyTeam()
      .then(() => {
        redirect("/dashboard");
      })
      .catch(() => {
        redirect("/join");
      });
  }, []);

  return <h4>Loading...</h4>;
}

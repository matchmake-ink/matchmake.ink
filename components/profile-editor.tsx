"use client";
import { useUser } from "@/lib/auth";
import { useState } from "react";
import { setProfile } from "@/lib/profile";

export default function ProfileEditor() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user, userLoading, userError } = useUser();
  const [ign, setIgn] = useState<string>("");
  const [discordTag, setdiscordTag] = useState<string>("");

  const onSubmit = async () => {
    if (user === null || userLoading || userError) {
      return;
    }
    setSubmitting(true);

    await setProfile(user.uid, ign, discordTag);

    setSubmitting(false);
  };

  return (
    <form>
      <div>
        <label htmlFor="ign">IGN</label>
        <input
          id="ign"
          type="text"
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="discordTag">Discord Tag</label>
        <input
          id="discordTag"
          type="text"
          value={discordTag}
          onChange={(e) => setdiscordTag(e.target.value)}
        />
      </div>
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
}

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/lib/firebase";

export interface Profile {
  discordTag: string;
  ign: string;
  teamId: string;
}

export async function setProfile(
  userId: string,
  ign: string,
  discordTag: string
): Promise<void> {
  await setDoc(doc(db, "profiles", userId), {
    ign: ign,
    discordTag: discordTag,
  });
}

export function useProfile() {
  const [value, loading, error] = useDocument(
    doc(db, "profiles", auth.currentUser?.uid ?? "")
  );

  const profile: Profile = {
    discordTag: value?.data()?.discordTag ?? "",
    ign: value?.data()?.ign ?? "",
    teamId: value?.data()?.teamId ?? "",
  };

  return { profile: profile, profileLoading: loading, profileError: error };
}

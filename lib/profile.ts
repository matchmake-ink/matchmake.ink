import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/lib/firebase";

export interface Profile {
  discordTag: string;
  ign: string;
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

  return { profile: value, profileLoading: loading, profileError: error };
}

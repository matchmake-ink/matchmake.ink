import { createContext } from "react";
import { useProfile } from "./profile";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc } from "firebase/firestore";
import { Profile } from "./profile";
import { Team } from "./team";
import { User } from "firebase/auth";

interface StateContext {
  profile: Profile | undefined;
  team: Team | undefined;
  user: User | null | undefined;
  loading: boolean;
  errors: any[];
}

export const StateContext = createContext<StateContext>({
  profile: undefined,
  team: undefined,
  user: undefined,
  loading: true,
  errors: [],
});

export function StateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, userLoading, userError] = useAuthState(auth);
  const [profileValue, profileLoading, profileError] = useDocument(
    doc(db, user ? `profiles/${auth.currentUser?.uid}` : "profiles/defaultguy")
  );

  const profile: Profile = {
    discordTag: profileValue?.data()?.discordTag ?? "",
    ign: profileValue?.data()?.ign ?? "",
    teamId: profileValue?.data()?.teamId ?? "",
    avatar: profileValue?.data()?.avatar ?? "",
  };

  const [teamValue, teamLoading, teamError] = useDocument(
    doc(
      db,
      profile.teamId !== "" ? `teams/${profile.teamId}` : "teams/freeAgent"
    )
  );

  const team: Team = {
    id: teamValue?.data()?.id || "",
    name: teamValue?.data()?.name || "",
    members: teamValue?.data()?.members || [],
    avatar: teamValue?.data()?.avatar || "",
  };

  return (
    <StateContext.Provider
      value={{
        profile: profile,
        team: team,
        user: user,
        loading: userLoading || profileLoading || teamLoading,
        errors: [userError, profileError, teamError],
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

import { useProfile } from "@/lib/client/profile";
import { useUser } from "@/lib/client/auth";

export default function ProfileView() {
  const { user, userLoading, userError } = useUser();
  const { profile, profileLoading, profileError } = useProfile();

  return (
    <div>
      <p>
        Hello world!
        {userLoading || userError || user === null || user === undefined
          ? "Someone!"
          : user.email}{" "}
      </p>
      <p>
        {profileLoading ||
        profileError ||
        profile === null ||
        profile === undefined
          ? "Someone!"
          : profile.ign}{" "}
      </p>
      <p>
        {profileLoading ||
        profileError ||
        profile === null ||
        profile === undefined
          ? "Someone!"
          : profile.discordTag}{" "}
      </p>
    </div>
  );
}

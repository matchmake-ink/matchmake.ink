import UserProfile from "@/components/user-profile";
import ProfileEditor from "@/components/profile-editor";

export default function ProfilePage() {
  return (
    <>
      <h1>Your Profile</h1>
      <div className="flex flex-col mx-auto align-middle justify-center w-full max-w-2xl">
        <UserProfile />
        <ProfileEditor />
      </div>
    </>
  );
}

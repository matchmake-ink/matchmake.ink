"use client";
import { useUser } from "@/lib/client/auth";
import { useState } from "react";
import { setProfile } from "@/lib/client/profile";
import Input from "./input";
import Modal from "./modal";
import Button from "./button";
import Select from "./select";
import LongInput from "./long-input";

export interface ProfileEditorProps {
  onFinishedSubmitting?: () => void;
}

export default function ProfileEditor({
  onFinishedSubmitting = () => {},
}: ProfileEditorProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user, userLoading, userError } = useUser();
  const [bio, setBio] = useState<string>("");
  const [sendou, setSendou] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [ign, setIgn] = useState<string>("");
  const [discordTag, setdiscordTag] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async () => {
    if (user === null || userLoading || userError) {
      return;
    }
    setSubmitting(true);

    await setProfile(user.uid, ign, discordTag, bio, sendou, rank, region);

    setSubmitting(false);
    onFinishedSubmitting();
  };

  return (
    <>
      <Button
        label="Update Profile"
        color="primary"
        className="my-4 max-w-lg mx-auto"
        onClick={() => setOpen(true)}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Update Profile">
        <form className="max-w-2xl flex flex-col justify-center">
          <Input
            label="IGN"
            type="text"
            value={ign}
            onChange={(value) => setIgn(value)}
          />
          <Input
            label="Discord Tag"
            type="text"
            value={discordTag}
            onChange={(value) => setdiscordTag(value)}
          />
          <Input
            label="Sendou Page"
            type="text"
            value={sendou}
            onChange={(value) => setSendou(value)}
          />
          <div className="flex flex-row">
            <Select
              label="Region"
              defalutValue={region}
              onChange={(value) => setRegion(value)}
              options={["North America", "Europe", "Japan", "Oceania"]}
            />
            <Select
              label="Rank"
              defalutValue={rank}
              onChange={(value) => setRank(value)}
              options={[
                "C-",
                "C",
                "C+",
                "B-",
                "B",
                "B+",
                "A-",
                "A",
                "A+",
                "S",
                "S+",
              ]}
            />
          </div>

          <LongInput
            label="Bio"
            value={bio}
            onChange={(value) => setBio(value)}
          />
          <Button
            label="Submit"
            color="primary"
            className="max-w-xs m-auto"
            onClick={onSubmit}
            disabled={
              submitting || userLoading || ign === "" || discordTag === ""
            }
          />
        </form>
      </Modal>
    </>
  );
}

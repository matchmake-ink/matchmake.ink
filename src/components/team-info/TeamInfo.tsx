import { backendClient } from "../../backend/client";

export interface TeamInfoProps {
  teamTag: string;
  editable: boolean;
}

export function TeamInfo({ teamTag, editable }: TeamInfoProps) {
  console.log(teamTag);
  console.log(editable);
}

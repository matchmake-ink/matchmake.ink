import { auth } from "./firebase";

export interface Profile {
  discordTag: string;
  ign: string;
  name: string;
}

export function initializeProfile(userId: string) {}

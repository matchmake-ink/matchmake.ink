export interface Profile {
  discordTag: string;
  ign: string;
  avatar: string;
  teamId: string;
  bio?: string;
  sendou?: string;
  rank?: string;
  region?: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  avatar: string;
}

export interface AuthResponse {
  uid: string;
  email: string;
  avatar: string;
  token: string;
}

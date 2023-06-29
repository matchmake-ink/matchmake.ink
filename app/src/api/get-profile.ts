export async function getMyProfile() {
  return Promise.resolve({
    id: "1234567890",
    discordId: "1234567890",
    ign: "abcdefg",
    teamId: "1234567890",
  });
}

export async function getProfileFromId(id: string) {
  return Promise.resolve({
    id: id,
    discordId: "1234567890",
    ign: "awesomeUser",
    teamId: "1234567890",
  });
}

export interface Profile {
  id: string;
  discordId: string;
  ign: string;
  teamId: string;
}

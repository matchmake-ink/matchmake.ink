export function genRandomUid(): string {
  return (
    Date.now().toString() + (Math.random() * 100000).toString().replace(".", "")
  );
}

export const genRandomName = () =>
  `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;

export function genRandomInviteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

const nouns = [
  "jellyfish",
  "squids",
  "gang",
  "bread",
  "cephalopods",
  "zappers",
  "stingrays",
  "fish",
  "inklings",
  "octolings",
  "default",
  "students",
  "accidents",
  "army",
  "communists",
  "defenders",
  "imposters",
  "aerosprays",
  "developers",
  "losers",
  "zombies",
  "homosexuals",
  "salmon",
];

const adjectives = [
  "abundant",
  "hydrophobic",
  "average",
  "green",
  "distracted",
  "blue",
  "unwashed",
  "red",
  "adaptive",
  "habitual",
  "restless",
  "resourceful",
  "useful",
  "weak",
  "bloodthirsty",
  "dying",
  "smelly",
  "british",
  "X-rank",
  "insufferable",
  "generous",
  "crafty",
  "suspicious",
  "crying",
  "depressed",
  "hydrophilic",
  "legendary",
];

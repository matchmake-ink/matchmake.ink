export function genRandomUid(): string {
  return (
    Date.now().toString() + (Math.random() * 100000).toString().replace(".", "")
  );
}

export const genRandomName = () =>
  `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;

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
];

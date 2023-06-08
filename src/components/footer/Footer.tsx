import contributors from "./contributors.json";

export interface Contributor {
  name: string;
  url: string;
}

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 text-sm text-gray-500 bg-background-darker">
      <p className="mb-2">Made by the following contributors:</p>
      <div className="flex flex-wrap justify-center">
        {contributors.map((contributor) => (
          <a
            href={contributor.url}
            key={contributor.name}
            className="mx-2 hover:text-blue-300 transition-all"
            target="_blank"
            rel="noreferrer"
          >
            {contributor.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

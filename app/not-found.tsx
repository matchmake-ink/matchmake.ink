import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col align-middle justify-center mx-auto text-center h-[60vh]">
      <h1>404</h1>
      <p>Page not found</p>
      <Link href="/">Return to the Homepage</Link>
    </main>
  );
}

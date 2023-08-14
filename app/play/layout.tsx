import Sidebar from "@/components/sidebar";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

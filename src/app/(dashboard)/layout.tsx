import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
      <ChatWidget />
    </div>
  );
}

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 px-6 md:px-10 py-10 max-w-6xl">{children}</main>
    </div>
  );
}

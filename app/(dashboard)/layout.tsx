import { Header } from "@/components/header";
import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}

import Link from "next/link";
import { Suspense } from "react";

import AddDriverDrawer from "@/components/add-driver/add-driver-dialog";
import HelloWorldSection from "@/components/sections/hello-world-section";
import ServerGreeting from "@/components/sections/server-greeting";

export default function Home() {
  return (
    <main className="container min-h-screen bg-background py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* server components */}
        <Suspense
          fallback={
            <div className="text-foreground">Loading server greeting...</div>
          }
        >
          <ServerGreeting />
        </Suspense>
        <Link
          href="/user"
          className="inline-flex items-center gap-2 font-medium text-primary transition-colors duration-200 hover:text-primary/80"
        >
          Go to User Page
        </Link>
        <AddDriverDrawer />

        {/* client components */}
        <HelloWorldSection />
      </div>
    </main>
  );
}

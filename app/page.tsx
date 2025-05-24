import HelloWorldSection from "@/components/sections/hello-world-section";
import ServerGreeting from "@/components/sections/server-greeting";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-8 dark:bg-neutral-800">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <Link href="/user" className="text-blue-500 hover:underline">
          Go to User Page
        </Link>
        {/* server components */}
        <Suspense
          fallback={
            <div className="text-neutral-900 dark:text-white">
              Loading server greeting...
            </div>
          }
        >
          <ServerGreeting />
        </Suspense>

        <HelloWorldSection />
        {/* Top component content */}
        {/* client components */}
      </div>
    </main>
  );
}

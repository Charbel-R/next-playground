import { RegistrationForm } from "@/components/user/registration-form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <Link href="/" className="mb-4 text-blue-500 hover:underline">
        Back to Home
      </Link>
      <RegistrationForm />
    </main>
  );
}

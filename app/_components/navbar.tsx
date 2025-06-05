import Link from "next/link";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { ModeToggle } from "@/components/theme/darkmode-toggle";

const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-gray-900/90 px-4 shadow-lg backdrop-blur-md dark:border-gray-700/20 dark:bg-gray-950/90 lg:px-6">
      {/* Logo/Brand */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
            CR-Solutions
          </h2>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/todo"
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            Tasks
          </Link>
        </nav>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton>
              <button className="rounded-lg bg-blue-600/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:shadow-lg">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;

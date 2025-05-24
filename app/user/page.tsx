import { RegistrationForm } from "@/components/user/registration-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 px-4 py-12">
      <div className="container mx-auto">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-medium text-primary transition-colors duration-200 hover:text-primary/80"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          Back to Home
        </Link>

        <div className="mx-auto max-w-lg">
          <Card className="border-border/50 bg-card/95 shadow-2xl backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-3xl font-bold text-transparent">
                User Registration
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

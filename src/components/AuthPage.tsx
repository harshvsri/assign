import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden w-1/2 flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          ASSIGN
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Tired of the hassle of writing assignments and coding on
              pen and paper? Assign is here to revolutionize your experience.
              Say goodbye to the old, tedious way of doing things. With Assign,
              you get an interactive platform designed to make assignment
              writing and coding seamless and engaging. &rdquo;
            </p>
            <footer className="text-sm">Harsh, founder @ Assign</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2 px-6 sm:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp ? "Create an account" : "Sign in to your account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? "Enter your email below to create your account"
                : "Enter your email below to sign in to your account"}
            </p>
          </div>
          {isSignUp ? <SignUpForm /> : <SignInForm />}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              className="underline underline-offset-4 hover:text-primary"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
            />
          </div>
          <Button>Sign In</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        <School className="mr-2 h-4 w-4" />
        Campus Login
      </Button>
    </div>
  );
}

function SignUpForm() {
  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
            />
          </div>
          <Button>Sign Up</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        <School className="mr-2 h-4 w-4" />
        Campus Login
      </Button>
    </div>
  );
}

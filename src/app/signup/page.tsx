import type { Metadata } from "next";
import { AuthForm } from "@/components/foundry/auth-form";

export const metadata: Metadata = { title: "Sign up", robots: { index: false, follow: false } };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}

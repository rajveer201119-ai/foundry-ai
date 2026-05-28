"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    const supabase = createClient();
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }
    const action = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await action.call(supabase.auth, { email, password });
    if (error) setMessage(error.message);
    else router.push("/dashboard");
  }

  return (
    <Card className="mx-auto mt-16 max-w-md">
      <CardContent className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-[-0.055em] text-white">{mode === "login" ? "Log in" : "Create account"}</h1>
        <Input type="email" placeholder="founder@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button className="w-full" onClick={submit}>{mode === "login" ? "Log in" : "Sign up"}</Button>
        {message ? <p className="text-sm text-cyan-100">{message}</p> : null}
      </CardContent>
    </Card>
  );
}

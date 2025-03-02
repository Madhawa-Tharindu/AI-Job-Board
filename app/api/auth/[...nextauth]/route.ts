import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


export async function POST(req: Request) {
  // Read the request body (email & password)
  const { email, password } = await req.json();

  // Call Supabase to sign in with email & password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If there's an error (wrong password, no account), return an error response
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // If login is successful, return user data
  return NextResponse.json({ user: data.user });
}

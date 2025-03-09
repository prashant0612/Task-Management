import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { token } = await req.json();

    // Send the token to the backend
    const response = await fetch("http://localhost:4000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Authentication failed");
    }

    return NextResponse.json(
      { message: data?.message, user: data?.user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

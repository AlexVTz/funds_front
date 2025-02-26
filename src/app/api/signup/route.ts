import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password, email, country } = await req.json();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // Make a server-side request to your external Node server
    const fetchRes = await fetch("http://13.52.251.75:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, country }),
    });
    console.log("fetchRes", fetchRes);
    const result = await fetchRes.json();

    if (!fetchRes.ok) {
      // External service indicated an error
      return NextResponse.json(result, { status: fetchRes.status });
    }

    // If success, redirect to login or show success
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}

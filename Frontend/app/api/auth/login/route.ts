import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const nestResponse = await fetch(`${endpoints.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!nestResponse.ok) {
    return NextResponse.json(
      { message: "Invalid credentials", ok: false },
      { status: 401 },
    );
  }

  const data: { access_token: string } = await nestResponse.json();

  const cookieStore = await cookies();
  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return NextResponse.json({ ok: true });
}

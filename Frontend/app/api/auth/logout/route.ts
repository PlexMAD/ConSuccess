import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Internal server error", ok: false },
      { status: 500 },
    );
  }
}

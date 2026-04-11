import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { data } = await axiosApi.get<{
      id: number;
      username: string;
      role: string;
      avatar: string | null;
    }>(`${endpoints.auth}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({
      ok: true,
      user: data,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }
}

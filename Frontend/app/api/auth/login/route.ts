import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nestResponse = await axiosApi.post(
      `${endpoints.auth}/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data: { access_token: string } = nestResponse.data;

    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return NextResponse.json(
        { message: "Invalid credentials", ok: false },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error", ok: false },
      { status: 500 },
    );
  }
}

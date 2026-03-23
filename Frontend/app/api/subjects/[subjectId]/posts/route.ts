import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ subjectId: string }> },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subjectId } = await params;
    const contentType = req.headers.get("content-type") ?? "";
    const body = Buffer.from(await req.arrayBuffer());

    const { data } = await axiosApi.post(
      `${endpoints.subjects}/${subjectId}/posts`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": contentType,
        },
      },
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

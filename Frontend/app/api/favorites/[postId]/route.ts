import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId } = await params;
    const { data } = await axiosApi.post(
      `${endpoints.favorites}/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    revalidatePath("/", "layout");
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

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId } = await params;
    const { data } = await axiosApi.delete(
      `${endpoints.favorites}/${postId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    revalidatePath("/", "layout");
    return NextResponse.json(data);
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

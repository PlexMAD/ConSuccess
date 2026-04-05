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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId } = await params;
    const contentType = req.headers.get("content-type") ?? "";
    const body = Buffer.from(await req.arrayBuffer());

    const { data } = await axiosApi.patch(
      `${endpoints.knowledgePosts}/${postId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": contentType,
        },
      },
    );

    revalidatePath("/knowledge", "layout");
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
      `${endpoints.knowledgePosts}/${postId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    revalidatePath("/knowledge", "layout");
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

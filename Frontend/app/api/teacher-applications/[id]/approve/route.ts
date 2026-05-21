import { axiosApi } from "@/shared/api/config";
import { endpoints } from "@/shared/api/endpoints";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { data } = await axiosApi.patch(
      `${endpoints.teacherApplications}/${id}/approve`,
      undefined,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    revalidatePath("/moderator/teacher-applications");
    revalidatePath("/admin/users");
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

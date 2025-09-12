import { NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const userinpt = formData.get("userinpt")?.toString() || "";
    const refrenceImg = formData.get("refrenceImg") || null;
    const faceImg = formData.get("faceImg") || null;

    const inputData = {
      userinpt: userinpt,
      refrenceImg: refrenceImg
        ? await GetBufferData(refrenceImg as File)
        : null,
      faceImg: faceImg ? await GetBufferData(faceImg as File) : null,
      userEmail: session.user.email,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Error processing request:", error);
  }
};

const GetBufferData = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    buffer: buffer.toString("base64"),
  };
};

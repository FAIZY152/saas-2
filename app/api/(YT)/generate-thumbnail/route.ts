import { NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const userinpt = formData.get("userinpt")?.toString() || "";
    const refrenceImg = formData.get("refrenceImg") || null;
    const faceImg = formData.get("faceImg") || null;

    console.log(userinpt, refrenceImg, faceImg);
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

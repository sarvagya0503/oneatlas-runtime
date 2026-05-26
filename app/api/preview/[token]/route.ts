import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const { token } = await params;

    const preview = await prisma.previewSnapshot.findUnique({
      where: { token },
    });

    if (!preview) {
      return NextResponse.json(
        { success: false, error: "Preview not found" },
        { status: 404 }
      );
    }

    if (preview.expiresAt && preview.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: "Preview expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        token: preview.token,
        schema: preview.schema,
        createdAt: preview.createdAt,
        expiresAt: preview.expiresAt,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to load preview" },
      { status: 500 }
    );
  }
}
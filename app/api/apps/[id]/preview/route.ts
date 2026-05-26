import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: Request, { params }: Props) {
  try {
    const { id } = await params;

    const app = await prisma.app.findUnique({
      where: { id },
    });

    if (!app) {
      return NextResponse.json(
        { success: false, error: "App not found" },
        { status: 404 }
      );
    }

    const token = nanoid(12);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const preview = await prisma.previewSnapshot.create({
      data: {
        appId: app.id,
        token,
      schema: app.schema as object,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        token: preview.token,
        previewUrl: `/preview/${preview.token}`,
        expiresAt: preview.expiresAt,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to create preview" },
      { status: 500 }
    );
  }
}
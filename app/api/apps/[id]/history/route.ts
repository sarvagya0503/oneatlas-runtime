import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const history = await prisma.mutationLog.findMany({
      where: {
        appId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch history",
      },
      {
        status: 500,
      }
    );
  }
}
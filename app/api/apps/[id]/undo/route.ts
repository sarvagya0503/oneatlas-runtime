import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const app = await prisma.app.findUnique({
      where: { id },
    });

    if (!app) {
      return NextResponse.json(
        {
          success: false,
          error: "App not found",
        },
        {
          status: 404,
        }
      );
    }

    if (app.version <= 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Nothing to undo",
        },
        {
          status: 400,
        }
      );
    }

    const previousVersion = await prisma.schemaVersion.findFirst({
      where: {
        appId: id,
        version: app.version - 1,
      },
    });

    if (!previousVersion) {
      return NextResponse.json(
        {
          success: false,
          error: "Previous version not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedApp = await prisma.app.update({
      where: { id },
      data: {
       schema: previousVersion.schema as object,
        version: previousVersion.version,
      },
    });

    await prisma.mutationLog.create({
      data: {
        appId: id,
        instruction: "UNDO",
        summary: `Reverted to version ${previousVersion.version}`,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedApp,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Undo failed",
      },
      {
        status: 500,
      }
    );
  }
}
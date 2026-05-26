import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applyInstruction } from "@/lib/mutation-engine";
import { AppSchema } from "@/types/app";
import { z } from "zod";

const editSchema = z.object({
  instruction: z.string().min(3),
});

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = editSchema.parse(body);

    const app = await prisma.app.findUnique({
      where: { id },
    });

    if (!app) {
      return NextResponse.json(
        { success: false, error: "App not found" },
        { status: 404 }
      );
    }

    const currentSchema = app.schema as AppSchema;

    const result = applyInstruction(
      currentSchema,
      validated.instruction
    );

    const nextVersion = app.version + 1;

    const updatedApp = await prisma.$transaction(async (tx) => {
      const updated = await tx.app.update({
        where: { id },
        data: {
          schema: result.schema,
          version: nextVersion,
        },
      });

      await tx.schemaVersion.create({
        data: {
          appId: id,
          version: nextVersion,
          schema: result.schema,
        },
      });

      await tx.mutationLog.create({
        data: {
          appId: id,
          instruction: validated.instruction,
          summary: result.summary,
        },
      });

      return updated;
    });

    return NextResponse.json({
      success: true,
      data: {
        appId: updatedApp.id,
        version: updatedApp.version,
        schema: updatedApp.schema,
        summary: result.summary,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matchTemplate } from "@/lib/matcher";
import { z } from "zod";

const generateSchema = z.object({
  prompt: z.string().min(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = generateSchema.parse(body);

    const template = matchTemplate(validated.prompt);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: "No matching template found",
        },
        { status: 404 }
      );
    }

    const app = await prisma.app.create({
      data: {
        name: `${template.name} App`,
        templateId: template.id,
        schema: template.schema,
        version: 1,
      },
    });

    await prisma.schemaVersion.create({
      data: {
        appId: app.id,
        version: 1,
        schema: template.schema,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        appId: app.id,
        generatedName: app.name,
        templateUsed: template.name,
        schema: template.schema,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { templates } from "@/lib/templates";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: Request, { params }: Props) {
  try {
    const { id } = await params;

    const template = templates.find((item) => item.id === id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: "Template not found",
        },
        {
          status: 404,
        }
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
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to instantiate template",
      },
      {
        status: 500,
      }
    );
  }
}
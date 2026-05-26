import { AppSchema } from "@/types/app";

type MutationResult = {
  schema: AppSchema;
  summary: string;
};

function titleCase(text: string) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toFieldId(text: string) {
  return text.toLowerCase().trim().replaceAll(" ", "-");
}

function cleanFieldName(text: string) {
  return text
    .toLowerCase()
    .replace(/\badd\b/g, "")
    .replace(/\bremove\b/g, "")
    .replace(/\bfield\b/g, "")
    .replace(/\bcolumn\b/g, "")
    .replace(/\ba\b/g, "")
    .replace(/\ban\b/g, "")
    .trim();
}

export function applyInstruction(
  schema: AppSchema,
  instruction: string
): MutationResult {
  const lower = instruction.toLowerCase().trim();
  const updatedSchema: AppSchema = structuredClone(schema);

  const firstPage = updatedSchema.pages[0];
  const firstComponent = firstPage.components[0];

  if (!firstComponent.fields) {
    firstComponent.fields = [];
  }

  if (
    lower.includes("add") &&
    (lower.includes("field") || lower.includes("column"))
  ) {
    const fieldName = cleanFieldName(lower);

    if (!fieldName) {
      throw new Error("Please mention the field name to add.");
    }

    const alreadyExists = firstComponent.fields.some(
      (field) => field.name.toLowerCase() === fieldName
    );

    if (alreadyExists) {
      throw new Error(`${titleCase(fieldName)} field already exists.`);
    }

    firstComponent.fields.push({
      id: toFieldId(fieldName),
      name: titleCase(fieldName),
      type:
        fieldName.includes("status") || fieldName.includes("priority")
          ? "select"
          : "text",
    });

    return {
      schema: updatedSchema,
      summary: `Added ${titleCase(fieldName)} field`,
    };
  }

  if (
    lower.includes("remove") &&
    (lower.includes("field") || lower.includes("column"))
  ) {
    const fieldName = cleanFieldName(lower);

    const beforeCount = firstComponent.fields.length;

    firstComponent.fields = firstComponent.fields.filter(
      (field) => field.name.toLowerCase() !== fieldName
    );

    if (firstComponent.fields.length === beforeCount) {
      throw new Error(`${titleCase(fieldName)} field was not found.`);
    }

    return {
      schema: updatedSchema,
      summary: `Removed ${titleCase(fieldName)} field`,
    };
  }

  if (lower.startsWith("rename")) {
    const renameMatch = lower.match(/^rename\s+(.+?)\s+to\s+(.+)$/);

    if (!renameMatch) {
      throw new Error("Use format: Rename old field to new field");
    }

    const oldName = renameMatch[1].trim();
    const newName = renameMatch[2].trim();

    const field = firstComponent.fields.find(
      (item) => item.name.toLowerCase() === oldName
    );

    if (!field) {
      throw new Error(`${titleCase(oldName)} field not found.`);
    }

    field.name = titleCase(newName);
    field.id = toFieldId(newName);

    return {
      schema: updatedSchema,
      summary: `Renamed ${titleCase(oldName)} to ${titleCase(newName)}`,
    };
  }

  throw new Error(
    "Instruction not recognized. Try: Add priority field, Remove email field, Rename name to customer name."
  );
}
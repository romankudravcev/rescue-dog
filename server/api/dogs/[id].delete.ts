import { defineEventHandler } from "h3";
import { tables, useDrizzle } from "~/server/utils/database";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string> | undefined;

  if (!params || !params.id) {
    return {
      error: "Invalid request, missing dogs ID",
    };
  }

  const { id } = params;

  try {
    const db = useDrizzle();
    const deleteResult = await db
      .delete()
      .from(tables.dogs)
      .where(eq(tables.dogs.id, Number(id)));

    if (deleteResult.rowCount === 0) {
      return {
        error: "Dog not found",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      error: "Error deleting dog",
      details: (error as Error).message,
    };
  }
});

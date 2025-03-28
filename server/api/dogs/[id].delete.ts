import { defineEventHandler } from "h3";
import dogService from "~/server/services/dogService";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string> | undefined;

  if (!params || !params.id) {
    return {
      error: "Invalid request, missing dogs ID",
    };
  }

  const { id } = params;

  try {
    await dogService.deleteDog(id);
    return { success: true };
  } catch (error) {
    if ((error as Error).message === "Dog not found") {
      return {
        error: "Dog not found",
      };
    }
    return {
      error: "Error deleting dogs",
      details: (error as Error).message,
    };
  }
});

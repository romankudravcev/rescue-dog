import { defineEventHandler } from "h3";
import dogService from "../../services/dogService";
import { DogExtended } from "../../models/dog";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string> | undefined;

  if (!params || !params.id) {
    return {
      error: "Invalid request, missing dogs ID",
    };
  }

  const { id } = params;

  try {
    const dog: DogExtended = await dogService.getDogById(id);
    return dog;
  } catch (error) {
    if ((error as Error).message === "Dog not found") {
      return {
        error: "Dog not found",
      };
    }
    return {
      error: "Error fetching dogs",
      details: (error as Error).message,
    };
  }
});

import { defineEventHandler } from "h3";
import { mapToDogExtended } from "../../models/dog";
import { tables } from "~/server/utils/database";
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
    const dogArray = await db
      .select()
      .from(tables.dogs)
      .where(eq(tables.dogs.id, Number(id)))
      .limit(1);

    if (dogArray.length === 0) {
      return {
        error: "Dog not found",
      };
    }

    const dog = dogArray[0];

    const photos = await db
      .select()
      .from(tables.photos)
      .where(eq(tables.photos.dogId, Number(id)));

    return mapToDogExtended(dog, photos);
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

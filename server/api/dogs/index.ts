import { defineEventHandler } from "h3";
import { mapToDogPreview } from "../../models/dog";
import { dogs } from "~/server/database/schema";

export default defineEventHandler(async () => {
  try {
    const db = useDrizzle();
    const result = await db.select().from(dogs).all();
    return result.map((dog) => {
      return mapToDogPreview(dog);
    });
  } catch (error) {
    return {
      error: "Error fetching dogs",
      details: (error as Error).message,
    };
  }
});

import { defineEventHandler, getQuery } from "h3";
import dogService from "../../services/dogService";
import { DogPreview } from "../../models/dog";

export default defineEventHandler(async (event) => {
  const { breed, isAdopted } = getQuery(event);
  const filters: { breed?: string; isAdopted?: boolean } = {};

  if (breed) filters.breed = breed as string;
  if (isAdopted !== undefined) {
    filters.isAdopted = isAdopted === "true";
  }

  try {
    const dogs: DogPreview[] = await dogService.getAllDogs(filters);
    return dogs;
  } catch (error) {
    return {
      error: "Error fetching dogs",
      details: (error as Error).message,
    };
  }
});

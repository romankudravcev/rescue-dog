import { defineEventHandler, readBody } from "h3";
import { tables, useDrizzle } from "~/server/utils/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  if (
    !body ||
    !body.name ||
    !body.breed ||
    !body.age ||
    !body.gender ||
    !body.size ||
    !body.neutered ||
    !body.healthStatus ||
    !body.adoptionStatus ||
    !body.description ||
    !body.previewPhotoUrl ||
    !body.vaccinationStatus
  ) {
    return {
      error: "Invalid request, missing required dog data",
    };
  }

  const newDog: Dog = {
    id: 0,
    name: body.name,
    breed: body.breed,
    age: body.age,
    gender: body.gender,
    size: body.size,
    neutered: body.neutered,
    healthStatus: body.healthStatus,
    adoptionStatus: body.adoptionStatus,
    description: body.description,
    previewPhotoUrl: body.previewPhotoUrl,
    dateAdded: new Date(),
    lastUpdated: new Date(),
    vaccinationStatus: body.vaccinationStatus,
    specialNeeds: body.specialNeeds || null,
  };

  try {
    const db = useDrizzle();
    await db.insert(tables.dogs).values({
      name: newDog.name,
      breed: newDog.breed,
      age: newDog.age,
      gender: newDog.gender,
      size: newDog.size,
      neutered: newDog.neutered,
      healthStatus: newDog.healthStatus,
      adoptionStatus: newDog.adoptionStatus,
      description: newDog.description,
      previewPhotoUrl: newDog.previewPhotoUrl,
      dateAdded: newDog.dateAdded.getTime(),
      lastUpdated: newDog.lastUpdated.getTime(),
      vaccinationStatus: newDog.vaccinationStatus,
      specialNeeds: newDog.specialNeeds,
    });

    return { success: true, dog: newDog };
  } catch (error) {
    return {
      error: "Error creating dog",
      details: (error as Error).message,
    };
  }
});

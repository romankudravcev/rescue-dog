import { defineEventHandler, readBody } from "h3";
import dogService from "~/server/services/dogService";
import { DogExtended } from "~/server/models/dog";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  if (
    !body ||
    !body.name ||
    !body.breed ||
    !body.age ||
    !body.size ||
    !body.color ||
    !body.adoptionStatus ||
    !body.photoUrl
  ) {
    return {
      error: "Invalid request, missing required dogs data",
    };
  }

  const newDog: DogExtended = {
    id: crypto.randomUUID(),
    name: body.name,
    breed: body.breed,
    age: body.age,
    gender: body.gender,
    size: body.size,
    color: body.color,
    weight: body.weight,
    healthStatus: body.healthStatus,
    adoptionStatus: body.adoptionStatus,
    description: body.description,
    photoUrl: body.photoUrl,
    dateAdded: new Date(),
    lastUpdated: new Date(),
    vaccinationStatus: body.vaccinationStatus,
    specialNeeds: body.specialNeeds,
    microchipId: body.microchipId,
    adoptionHistory: [],
  };

  try {
    return await dogService.createDog(newDog);
  } catch (error) {
    return {
      error: "Error creating dogs",
      details: (error as Error).message,
    };
  }
});

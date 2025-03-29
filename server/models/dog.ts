import { Photo } from "~/server/utils/database";

export class DogPreview {
  constructor(
    public id: string,
    public name: string,
    public breed: string,
    public gender: "male" | "female",
    public age: number,
    public size: "small" | "medium" | "large",
    public neutered: boolean,
    public adoptionStatus: "available" | "adopted" | "pending",
    public previewPhotoUrl: string,
  ) {}
}

export class DogExtended {
  constructor(
    public id: string,
    public name: string,
    public breed: string,
    public age: number,
    public gender: "male" | "female",
    public size: "small" | "medium" | "large",
    public neutered: boolean,
    public healthStatus: string,
    public adoptionStatus: "available" | "adopted" | "pending",
    public description: string,
    public previewPhotoUrl: string,
    public photosUrl: string[],
    public dateAdded: Date,
    public lastUpdated: Date,
    public vaccinationStatus: string,
    public specialNeeds: string | null,
  ) {}
}

export function mapToDogPreview(data: Dog): DogPreview {
  return new DogPreview(
    data.id,
    data.name,
    data.breed,
    data.gender.toLowerCase() as "male" | "female",
    data.age,
    data.size.toLowerCase() as "small" | "medium" | "large",
    Boolean(data.neutered),
    data.adoptionStatus.toLowerCase() as "available" | "adopted" | "pending",
    data.previewPhotoUrl,
  );
}

export function mapToDogExtended(dog: Dog, photos: Photo[]): DogExtended {
  return new DogExtended(
    dog.id,
    dog.name,
    dog.breed,
    dog.gender.toLowerCase() as "male" | "female",
    dog.age,
    dog.size.toLowerCase() as "small" | "medium" | "large",
    Boolean(dog.neutered),
    dog.healthStatus,
    dog.adoptionStatus.toLowerCase() as "available" | "adopted" | "pending",
    dog.description,
    dog.previewPhotoUrl,
    photos.map((photo) => photo.url),
    new Date(dog.dateAdded),
    new Date(dog.lastUpdated),
    dog.vaccinationStatus,
    dog.specialNeeds ? dog.specialNeeds : null,
  );
}

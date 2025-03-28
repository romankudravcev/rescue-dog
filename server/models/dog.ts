export class DogPreview {
  constructor(
    public id: string,
    public name: string,
    public breed: string,
    public gender: "male" | "female",
    public age: number,
    public size: "small" | "medium" | "large",
    public neutered: boolean,
    public color: string,
    public adoptionStatus: "available" | "adopted" | "pending",
    public photoUrl: string,
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
    public color: string,
    public weight: number,
    public healthStatus: string,
    public adoptionStatus: "available" | "adopted" | "pending",
    public description: string,
    public photoUrl: string,
    public dateAdded: Date,
    public lastUpdated: Date,
    public vaccinationStatus: string,
    public specialNeeds: string | null,
    public microchipId: string | null,
    public adoptionHistory: Array<string>,
  ) {}
}

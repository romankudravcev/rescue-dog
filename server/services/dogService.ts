import { DogExtended } from "../models/dog";
import { usePostgres } from "~/server/utils/postgres";

class DogService {
  // Create a new dogs
  async createDog(dog: DogExtended) {
    try {
      const sql = usePostgres();
      const createdDog = await sql`
          INSERT INTO dogs (id, name, breed, age, gender, size, color, weight, health_status,
                            adoption_status, description, photo_url, date_added, last_updated,
                            vaccination_status, special_needs, microchip_id, adoption_history, neutered)
          VALUES (${dog.id}, ${dog.name}, ${dog.breed}, ${dog.age}, ${dog.gender},
                  ${dog.size}, ${dog.color}, ${dog.weight}, ${dog.healthStatus},
                  ${dog.adoptionStatus}, ${dog.description}, ${dog.photoUrl},
                  ${dog.dateAdded}, ${dog.lastUpdated}, ${dog.vaccinationStatus},
                  ${dog.specialNeeds}, ${dog.microchipId}, ${dog.adoptionHistory}, ${dog.neutered}) RETURNING *;
      `;

      return createdDog[0];
    } catch (error) {
      console.error("Dog creation error:", error);
      throw error;
    }
  }

  // Get all dogs
  async getAllDogs(filters: { breed?: string; isAdopted?: boolean } = {}) {
    try {
      const sql = usePostgres();
      let query = sql`SELECT id, name, breed, gender, age, neutered, size, color, adoption_status, photo_url FROM dogs WHERE 1=1`;
      const params: any[] = [];

      if (filters.breed) {
        query = sql`${query} AND breed = ${filters.breed}`;
      }

      if (filters.isAdopted !== undefined) {
        query = sql`${query} AND adoption_status = ${filters.isAdopted ? "adopted" : "available"}`;
      }

      const result = await sql`${query} ORDER BY date_added DESC`;

      return result.map((row: any) => ({
        id: row.id,
        name: row.name,
        breed: row.breed,
        gender: row.gender,
        age: row.age,
        neutered: row.neutered,
        size: row.size,
        color: row.color,
        adoptionStatus: row.adoption_status,
        photoUrl: row.photo_url,
      }));
    } catch (error) {
      console.error("Fetch dogs error:", error);
      throw error;
    }
  }

  // Get single dogs by ID
  async getDogById(id: string) {
    try {
      const sql = usePostgres();
      const dog = await sql`SELECT * FROM dogs WHERE id = ${id}`;

      if (dog.length === 0) {
        throw new Error("Dog not found");
      }

      return dog[0];
    } catch (error) {
      console.error("Fetch dog error:", error);
      throw error;
    }
  }

  // Delete a dogs
  async deleteDog(id: string) {
    try {
      const sql = usePostgres();
      const dog = await sql`DELETE FROM dogs WHERE id = ${id}`;

      if (dog.length === 0) {
        throw new Error("Dog not found");
      }

      return true;
    } catch (error) {
      console.error("Delete dogs error:", error);
      throw error;
    }
  }

  // Update dogs adoption status
  async updateDogAdoptionStatus(id: string, isAdopted: boolean) {
    try {
      const sql = usePostgres();
      const dog = await sql`
        UPDATE dogs SET adoption_status = ${isAdopted ? "adopted" : "available"} WHERE id = ${id} RETURNING *;
      `;

      if (dog.length === 0) {
        throw new Error("Dog not found");
      }

      return dog[0];
    } catch (error) {
      console.error("Update adoption status error:", error);
      throw error;
    }
  }
}

export default new DogService();

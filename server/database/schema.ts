import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const dogs = sqliteTable("dogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  size: text("size").notNull(),
  neutered: integer("neutered", { mode: "boolean" }).notNull(),
  healthStatus: text("health_status").notNull(),
  adoptionStatus: text("adoption_status").notNull(),
  description: text("description").notNull(),
  previewPhotoUrl: text("preview_photo_url").notNull(),
  dateAdded: integer("date_added", { mode: "timestamp" }).notNull(),
  lastUpdated: integer("last_updated", { mode: "timestamp" }).notNull(),
  vaccinationStatus: text("vaccination_status").notNull(),
  specialNeeds: text("special_needs"),
});

export const photos = sqliteTable("photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dogId: integer("dog_id")
    .notNull()
    .references(() => dogs.id),
  url: text("url").notNull(),
});

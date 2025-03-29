import { migrate } from "drizzle-orm/d1/migrator";

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) {
    return;
  }

  onHubReady(async () => {
    await migrate(useDrizzle(), {
      migrationsFolder: "server/database/migrations",
    });
  });
});

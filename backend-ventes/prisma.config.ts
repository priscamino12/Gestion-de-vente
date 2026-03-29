// prisma.config.ts
import "dotenv/config";               // charge .env automatiquement
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",      // chemin vers ton schema

  migrations: {
    path: "prisma/migrations",         // dossier des migrations (par défaut)
  },

  datasource: {
    url: env("DATABASE_URL"),          // ← c'est ici qu'on met l'URL maintenant
  },
});
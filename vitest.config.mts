import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export default defineConfig({
  resolve: { alias: { "@": resolve(fileURLToPath(new URL(".", import.meta.url))) } },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});

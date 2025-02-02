import path from "path";

export default {
  resolve: {
    alias: {
      "@config": path.resolve("src/config"),
      "@database": path.resolve("src/database"),
      "@controllers": path.resolve("src/controllers"),
      "@models": path.resolve("src/models"),
      "@routes": path.resolve("src/routes"),
    },
    extensions: [".js", ".ts", ".json"],
  },
};

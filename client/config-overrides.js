/* eslint-disable no-undef */
import path from "path";

export default function override(config) {
  // Adding aliases for utils and components
  config.resolve.alias = {
    ...config.resolve.alias,
    "@utils": path.resolve(process.cwd(), "src/utils"),
    "@components": path.resolve(process.cwd(), "src/components"),
  };

  return config;
}

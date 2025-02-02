import { pathToFileURL } from "url";
import { resolve } from "path";
import fs from "fs";

export function resolve(specifier, context, defaultResolve) {
  if (!specifier.startsWith(".") && !specifier.startsWith("/")) {
    return defaultResolve(specifier, context, defaultResolve);
  }

  const filePath = resolve(context.parentURL.replace("file://", ""), specifier);

  if (fs.existsSync(filePath + ".js")) {
    return defaultResolve(
      pathToFileURL(filePath + ".js").href,
      context,
      defaultResolve
    );
  }

  return defaultResolve(specifier, context, defaultResolve);
}

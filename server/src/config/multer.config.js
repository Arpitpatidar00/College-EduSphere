import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path, { extname, join } from "path";

export function getImageSavePath(url, file) {
  let modulePath = "";
  if (/^\/post\/(create-post|update-post)/.test(url)) {
    modulePath = `Posts/${file.fieldname}`;
  } else if (/^\/college\/update$/.test(url)) {
    modulePath = `userProfile/college/${file.fieldname}`;
  } else if (/^\/student\/update$/.test(url)) {
    modulePath = `userProfile/student/${file.fieldname}`;
  } else if (/^\/stories\/create-or-update$/.test(url)) {
    modulePath = `stories/${file.fieldname}`;
  } else {
    modulePath = `others/${file.fieldname}`;
  }
  return modulePath;
}

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const basePath = "public/assets/";
      const url = req.originalUrl.includes("?")
        ? req.originalUrl.split("?")[0]
        : req.originalUrl;

      const modulePath = getImageSavePath(url, file);
      const fullPath = join(basePath, modulePath);

      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }

      cb(null, fullPath);
    },
    filename(_req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`
      );
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(_req, file, cb) {
      const fileTypes =
        /jpeg|jpg|png|gif|bmp|webp|tiff|svg|mp4|avi|mov|wmv|flv|mkv|webm/;
      const extnameValid = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetypeValid = fileTypes.test(file.mimetype);

      if (extnameValid && mimetypeValid) {
        return cb(null, true);
      }

      cb(new Error("Invalid file type"));
    },
  });
};

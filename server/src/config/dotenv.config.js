import dotenv from "dotenv";

// Load default .env file
dotenv.config({ path: ".env" });

// Load environment-specific .env file
dotenv.config({ path: `.env.${process.env.environment?.trim() || "development"}` });

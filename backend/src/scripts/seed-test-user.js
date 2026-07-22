import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import User from "../models/User.js";
import Token from "../models/Token.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is not defined in .env");
  process.exit(1);
}

const TEST_USERS = [];

for (let i = 1; i <= 6; i++) {
  TEST_USERS.push({
    name: `Admin${i}`,
    lastname: "Prometeo",
    email: `admin${i}@prometeo.com`,
    password: `Admin123!`,
    role: "admin",
    accountType: "admin",
    status: "active",
  });
}

for (let i = 1; i <= 6; i++) {
  TEST_USERS.push({
    name: `User${i}`,
    lastname: "Prometeo",
    email: `user${i}@prometeo.com`,
    password: `User123!`,
    role: "user",
    accountType: "user",
    status: "active",
  });
}

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log(
      `Connected — Database: ${mongoose.connection.db.databaseName}`
    );

    console.log("\nSyncing indexes...");
    await User.syncIndexes();
    console.log("  User collection and indexes synced");
    await Token.syncIndexes();
    console.log("  Token collection and indexes synced");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "\nCollections in database:",
      collections.map((c) => c.name).join(", ")
    );

    console.log(`\nSeeding ${TEST_USERS.length} test users...`);
    for (const userData of TEST_USERS) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`  ${userData.email} already exists, skipping`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 12);

      await User.create({
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        hashedPassword,
        role: userData.role,
        accountType: userData.accountType,
        status: userData.status,
      });

      console.log(
        `  Created: ${userData.email} (password: ${userData.password})`
      );
    }

    console.log("\n=== SEED COMPLETE ===");
    console.log("Test credentials generated (1 to 6 for each):");
    console.log("  Admins: admin1@prometeo.com / Admin123!");
    console.log("  Users:  user1@prometeo.com / User123!");
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed.");
    process.exit(0);
  }
}

seed();

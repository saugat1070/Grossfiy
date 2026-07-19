import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { groceryItems } from "../src/lib/server/db/schema";

dotenv.config();

const dbUrl = process.env.NEON_CONNECTION_STRING;
if (!dbUrl) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const sql = neon(dbUrl);
const db = drizzle({ client: sql });

const items = [
  {
    id: "1",
    name: "Whole Milk",
    category: "Dairy",
    quantity: "1 gallon",
    priority: "high",
  },
  {
    id: "2",
    name: "Eggs",
    category: "Dairy",
    quantity: "1 dozen",
    priority: "high",
  },
  {
    id: "3",
    name: "Chicken Breast",
    category: "Meat",
    quantity: "2 lbs",
    priority: "high",
  },
  {
    id: "4",
    name: "Bananas",
    category: "Fruits",
    quantity: "1 bunch",
    priority: "medium",
  },
  {
    id: "5",
    name: "Spinach",
    category: "Vegetables",
    quantity: "1 bag",
    priority: "medium",
  },
  {
    id: "6",
    name: "White Rice",
    category: "Grains",
    quantity: "5 lbs",
    priority: "low",
  },
  {
    id: "7",
    name: "Olive Oil",
    category: "Pantry",
    quantity: "1 bottle",
    priority: "medium",
  },
  {
    id: "8",
    name: "Bread",
    category: "Bakery",
    quantity: "1 loaf",
    priority: "high",
  },
  {
    id: "9",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: "4 pieces",
    priority: "medium",
  },
  {
    id: "10",
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: "2 cups",
    priority: "low",
  },
  {
    id: "11",
    name: "Pasta",
    category: "Grains",
    quantity: "1 box",
    priority: "medium",
  },
  {
    id: "12",
    name: "Onions",
    category: "Vegetables",
    quantity: "3 pieces",
    priority: "medium",
  },
];

async function seed() {
  console.log("Seeding grocery items...");
  await db.insert(groceryItems).values(items).onConflictDoNothing();
  console.log(`Seeded ${items.length} grocery items.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

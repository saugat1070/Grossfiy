import { boolean, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const groceryItems = pgTable("grocery_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: numeric("quantity").notNull(),
  purchased: boolean("purchased").notNull().default(false),
  priority: text("priority").notNull().default("medium"),
});

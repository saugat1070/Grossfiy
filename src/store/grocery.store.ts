import { create } from "zustand";

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Meat"
  | "Fruits"
  | "Vegetables"
  | "Grains"
  | "Pantry"
  | "Bakery";

export type GroceryItemPriority = "high" | "medium" | "low";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: string;
  priority: GroceryItemPriority;
};

export type CreateGroceryItem = {
  name: string;
  category: GroceryCategory;
  quantity: string;
  priority: GroceryItemPriority;
};

export type ItemsResponse = {
  items: GroceryItem[] | GroceryItem;
};

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateGroceryItem) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading:true});
    try {
      
    } catch (error) {
      
    }
  },
}));

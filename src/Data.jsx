export const menu = [
  { id: 1, name: "Margherita Pizza", price: 12.5 },
  { id: 2, name: "Pasta Carbonara", price: 14 },
  { id: 3, name: "Caesar Salad", price: 10 },
  { id: 4, name: "Grilled Salmon", price: 18 },
  { id: 5, name: "Steak Frites", price: 22 },
  { id: 6, name: "Mushroom Risotto", price: 16 },
  { id: 7, name: "Lobster Bisque", price: 20 },
  { id: 8, name: "Sushi Platter", price: 25 },
  { id: 9, name: "Tiramisu", price: 8 },
  { id: 10, name: "Panna Cotta", price: 9 },
  { id: 11, name: "Chicken Parmesan", price: 17 },
  { id: 12, name: "Beef Stroganoff", price: 19 },
  { id: 13, name: "Seafood Paella", price: 23 },
  { id: 14, name: "French Onion Soup", price: 11 },
  { id: 15, name: "Gnocchi Pesto", price: 13 },
  { id: 16, name: "BBQ Ribs", price: 21 },
  { id: 17, name: "Fish and Chips", price: 15 },
  { id: 18, name: "Eggplant Parmesan", price: 14 },
  { id: 19, name: "Duck Confit", price: 26 },
  { id: 20, name: "Lamb Chops", price: 28 }
];

export const tables = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  orders: [],
  allergies: "",
  totalBill: 0,
  status: "Available" 
}));

export const allergies = [
  "Gluten",
  "Peanuts",
  "Tree Nuts",
  "Milk / Dairy",
  "Eggs",
  "Fish",
  "Shellfish",
  "Soy",
  "Wheat",
  "Sesame",
  "Lupin",
  "Mustard",
  "Celery",
  "Sulphites"
];
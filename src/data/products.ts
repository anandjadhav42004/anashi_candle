export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
  category: string;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White",
    price: 30,
    image: "https://picsum.photos/seed/white-candle/600/800",
    description: "Pure, minimalist white candle for a clean aesthetic. Perfect for any room.",
    colors: ["White"],
    category: "Classic"
  },
  {
    id: "2",
    name: "Soft Pink Pastel",
    price: 30,
    image: "https://picsum.photos/seed/pink-candle/600/800",
    description: "A delicate soft pink candle that adds a touch of warmth and romance.",
    colors: ["Soft Pink"],
    category: "Pastel"
  },
  {
    id: "3",
    name: "Bright White",
    price: 30,
    image: "https://picsum.photos/seed/bright-white/600/800",
    description: "Extra bright white candle to light up your cozy corners.",
    colors: ["White"],
    category: "Classic"
  },
  {
    id: "4",
    name: "Cream & Pink Daisy",
    price: 30,
    image: "https://picsum.photos/seed/daisy-candle/600/800",
    description: "Adorable daisy-themed candle in cream and pink. Our most aesthetic piece.",
    colors: ["Cream", "Pink"],
    category: "Floral"
  },
  {
    id: "5",
    name: "Sky Blue",
    price: 30,
    image: "https://picsum.photos/seed/blue-candle/600/800",
    description: "Calming sky blue candle for peaceful vibes and relaxation.",
    colors: ["Blue"],
    category: "Pastel"
  },
  {
    id: "6",
    name: "Sunflower Yellow",
    price: 30,
    image: "https://picsum.photos/seed/yellow-candle/600/800",
    description: "Cheerful sunflower yellow candle to bring sunshine indoors.",
    colors: ["Yellow"],
    category: "Floral"
  },
  {
    id: "7",
    name: "Cream & Yellow",
    price: 30,
    image: "https://picsum.photos/seed/cream-yellow/600/800",
    description: "A soft blend of cream and yellow for a subtle, warm glow.",
    colors: ["Cream", "Yellow"],
    category: "Pastel"
  }
];

export const combos = [
  {
    id: "combo-1",
    name: "Trio Pack",
    price: 80,
    count: 3,
    tag: "Most Loved ❤️",
    description: "Pick any 3 candles and save!"
  },
  {
    id: "combo-2",
    name: "Value Bundle",
    price: 120,
    count: 5,
    tag: "Best Value ✨",
    description: "Pick any 5 candles for a complete set."
  }
];

export const reviews = [
  {
    id: 1,
    name: "Ananya S.",
    text: "So cute and aesthetic 😍",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul M.",
    text: "Perfect gift under budget!",
    rating: 5
  },
  {
    id: 3,
    name: "Priya K.",
    text: "Loved the quality ❤️",
    rating: 5
  },
  {
    id: 4,
    name: "Ishita G.",
    text: "Will order again!",
    rating: 5
  }
];

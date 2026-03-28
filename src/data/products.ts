import { productImages } from '../assets/products';

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
    name: "Daisy Candles",
    price: 30,
    image: productImages.daisyCollection,
    description: "Soft daisy candles in yellow, pink, and blue. Perfect for gifts, room decor, and cozy vibes.",
    colors: ["Yellow", "Pink", "Blue"],
    category: "Floral",
    isBestSeller: true
  },
  {
    id: "2",
    name: "Bubble Candle",
    price: 55,
    image: productImages.roseCandles,
    description: "Aesthetic pink bubble candle with a soft finish, made to elevate shelves, desks, and gifting moments.",
    colors: ["Pink"],
    category: "Aesthetic",
    isBestSeller: true
  },
  {
    id: "3",
    name: "Heart Candles",
    price: 65,
    image: productImages.heartMarbleDisplay,
    description: "Textured heart candles in white, pink, and red. A cute premium piece for gifts and cozy setups.",
    colors: ["White", "Pink", "Red"],
    category: "Romantic",
    isBestSeller: true
  },
  {
    id: "4",
    name: "Rose Candles",
    price: 95,
    image: productImages.roseDisplay,
    description: "Detailed rose candles in red and white with a rich floral look that stands out as decor or a gift.",
    colors: ["Red", "White"],
    category: "Floral"
  }
];

export const notices = [
  "All candles are non-refundable.",
  "Slight color or design variation may occur due to the handmade aesthetic finish.",
  "Keep away from direct heat before use.",
  "Burn on a flat, heat-safe surface.",
  "Never leave a burning candle unattended.",
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

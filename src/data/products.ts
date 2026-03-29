import { productImages } from '../assets/products';

export type ProductBadge = 'Best Seller' | 'Trending' | 'New Arrival' | 'Limited Edition';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
export type PaymentMethod =
  | 'UPI'
  | 'Credit Card'
  | 'Debit Card'
  | 'Net Banking'
  | 'Cash on Delivery'
  | 'Razorpay'
  | 'Stripe';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  badge?: ProductBadge;
  description: string;
  details: string[];
  fragrances: string[];
  colors: string[];
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  burnTime: string;
  deliveryEstimate: string;
  featured?: boolean;
  gallery?: boolean;
  customization?: {
    customMessage: boolean;
    giftPackaging: boolean;
  };
  reviews: ProductReview[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  stock: number;
  selectedColor: string;
  selectedFragrance: string;
  customMessage: string;
  giftPackaging: boolean;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  description: string;
  expiresAt: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  address: OrderAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  couponCode?: string;
  notifications: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

export interface BrandMetric {
  label: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

const baseReviews: ProductReview[] = [
  {
    id: 'review-1',
    author: 'Ananya S.',
    rating: 5,
    title: 'Looks premium on my dresser',
    comment: 'The finish is beautiful and the fragrance is soft without feeling overpowering.',
    date: '2026-03-03',
    verified: true,
  },
  {
    id: 'review-2',
    author: 'Rhea T.',
    rating: 5,
    title: 'Gift-ready and elegant',
    comment: 'The gift packaging made it feel like a proper boutique order.',
    date: '2026-03-08',
    verified: true,
  },
];

export const products: Product[] = [
  {
    id: 'daisy-candle',
    slug: 'daisy-candle',
    name: 'Daisy Candle',
    price: 30,
    category: 'Floral Candles',
    badge: 'Best Seller',
    description:
      'Soft aesthetic daisy candles made for gifting, room decor, and cozy corners.',
    details: ['Hand-poured finish', 'Slight variation may occur', 'Burn on a flat, heat-safe surface'],
    fragrances: ['Unscented'],
    colors: ['Yellow', 'Pink', 'Blue'],
    image: productImages.daisyCollection,
    images: [productImages.daisyCollection, productImages.yellowDaisy, productImages.wrappedDaisies],
    stock: 30,
    rating: 4.9,
    reviewCount: 18,
    burnTime: '6 hours',
    deliveryEstimate: 'Free delivery available',
    featured: true,
    gallery: true,
    customization: { customMessage: true, giftPackaging: true },
    reviews: baseReviews,
  },
  {
    id: 'bubble-candle',
    slug: 'bubble-candle',
    name: 'Bubble Candle',
    price: 55,
    category: 'Aesthetic Candles',
    badge: 'Trending',
    description:
      'A pink bubble candle with a soft, playful look that fits desks, gifts, and cozy decor setups.',
    details: ['Aesthetic matte finish', 'Handmade with love', 'Keep away from direct heat before use'],
    fragrances: ['Unscented'],
    colors: ['Pink'],
    image: productImages.pinkDaisyBox,
    images: [productImages.pinkDaisyBox, productImages.blueDaisyBox, productImages.daisyCollection],
    stock: 18,
    rating: 4.8,
    reviewCount: 11,
    burnTime: '8 hours',
    deliveryEstimate: 'Free delivery available',
    featured: true,
    gallery: true,
    customization: { customMessage: true, giftPackaging: true },
    reviews: baseReviews,
  },
  {
    id: 'heart-candle',
    slug: 'heart-candle',
    name: 'Heart Candle',
    price: 65,
    category: 'Gift Candles',
    badge: 'Limited Edition',
    description:
      'Cute heart candles designed for gifts, room decor, and soft romantic styling.',
    details: ['Gift-friendly design', 'Hand-finished aesthetic look', 'Never leave a burning candle unattended'],
    fragrances: ['Unscented'],
    colors: ['White', 'Pink', 'Red'],
    image: productImages.heartMarbleDisplay,
    images: [productImages.heartMarbleDisplay, productImages.heartGiftBox, productImages.roseDisplay],
    stock: 20,
    rating: 5,
    reviewCount: 14,
    burnTime: '7 hours',
    deliveryEstimate: 'Free delivery available',
    featured: true,
    gallery: true,
    customization: { customMessage: true, giftPackaging: true },
    reviews: baseReviews,
  },
  {
    id: 'rose-candle',
    slug: 'rose-candle',
    name: 'Rose Candle',
    price: 95,
    category: 'Floral Candles',
    badge: 'New Arrival',
    description:
      'Elegant rose candles for thoughtful gifts, aesthetic shelves, and cozy room decor.',
    details: ['Rose-shaped design', 'Soft handcrafted finish', 'Best burned on a flat, heat-safe surface'],
    fragrances: ['Unscented'],
    colors: ['Red', 'White'],
    image: productImages.roseDisplay,
    images: [productImages.roseDisplay, productImages.roseCandles, productImages.heartMarbleDisplay],
    stock: 16,
    rating: 4.9,
    reviewCount: 9,
    burnTime: '10 hours',
    deliveryEstimate: 'Free delivery available',
    featured: true,
    gallery: true,
    customization: { customMessage: true, giftPackaging: true },
    reviews: baseReviews,
  },
];

export const coupons: Coupon[] = [];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Megha',
    role: 'Gift buyer',
    quote: 'The candles looked so soft and pretty in real life, especially the daisy one.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Nikita',
    role: 'Returning customer',
    quote: 'The heart candles were perfect for gifting and the finish felt handmade in the best way.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Aarav',
    role: 'Home decor customer',
    quote: 'Quick delivery, cute packaging, and the rose candle looked amazing on my shelf.',
    rating: 5,
  },
];

export const galleryImages: GalleryImage[] = products
  .filter((product) => product.gallery)
  .flatMap((product, index) =>
    product.images.map((image, imageIndex) => ({
      id: `${product.id}-${imageIndex}`,
      image,
      alt: `${product.name} gallery image ${imageIndex + 1}`,
      caption:
        index % 2 === 0
          ? `${product.name} in a warm editorial setup`
          : `${product.name} styled for gifting moments`,
    })),
  );

export const notices = [
  'All candles are non-refundable.',
  'Slight color or design variation may occur because every candle has an aesthetic handmade finish.',
  'Keep away from direct heat before use.',
  'Burn on a flat, heat-safe surface.',
  'Never leave a burning candle unattended.',
];

export const brandMetrics: BrandMetric[] = [
  { label: 'Now in stock', value: 'Yes' },
  { label: 'Free delivery', value: 'Available' },
  { label: 'Payment', value: 'COD' },
  { label: 'Starting price', value: 'Rs.30' },
];

export const faqs: FAQ[] = [
  {
    question: 'Do you accept cash on delivery?',
    answer: 'Yes. Cash on Delivery is available for orders.',
  },
  {
    question: 'Do you offer free delivery?',
    answer: 'Yes. Free delivery is available.',
  },
  {
    question: 'Are these candles refundable?',
    answer: 'No. All candles are non-refundable.',
  },
];

export const seededOrders: Order[] = [
  {
    id: 'ANASHI-240318',
    customer: {
      name: 'Ritika Verma',
      email: 'ritika@example.com',
      phone: '+91 83080 08154',
    },
    address: {
      line1: '44 Lake View Apartments',
      line2: 'Near Sector 18 market',
      city: 'Noida',
      state: 'Uttar Pradesh',
      postalCode: '201301',
    },
    items: [
      {
        cartItemId: 'seed-cart-1',
        productId: 'heart-candle',
        name: 'Heart Candle',
        price: 65,
        image: productImages.heartMarbleDisplay,
        quantity: 1,
        category: 'Gift Candles',
        stock: 20,
        selectedColor: 'Pink',
        selectedFragrance: 'Unscented',
        customMessage: 'Happy anniversary, M.',
        giftPackaging: true,
      },
    ],
    subtotal: 65,
    discount: 0,
    total: 65,
    paymentMethod: 'Cash on Delivery',
    status: 'Shipped',
    placedAt: '2026-03-18T10:30:00.000Z',
    estimatedDelivery: '2026-03-31',
    notifications: [
      'Order confirmation email sent',
      'Payment success email sent',
      'Shipping update email sent',
    ],
  },
];

export const instagramUrl = 'https://www.instagram.com/';
export const whatsappNumber = '918308008154';
export const contactEmail = 'hello@anashicandles.com';
export const supportPhone = '+91 83080 08154';
export const brandName = 'ANASHI CANDLES';
export const brandTagline = 'Soft. Aesthetic. Made with Love.';

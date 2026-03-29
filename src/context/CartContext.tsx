import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  CartItem,
  Coupon,
  Order,
  OrderAddress,
  OrderCustomer,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductReview,
  coupons as defaultCoupons,
  products as defaultProducts,
  seededOrders,
} from '../data';

type CartSelection = {
  color: string;
  fragrance: string;
  quantity: number;
  customMessage?: string;
  giftPackaging?: boolean;
};

type PlaceOrderInput = {
  customer: OrderCustomer;
  address: OrderAddress;
  paymentMethod: PaymentMethod;
};

type AdminProductInput = Omit<Product, 'reviews' | 'reviewCount' | 'rating'> & {
  reviews?: ProductReview[];
};

interface StoreContextType {
  cart: CartItem[];
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  isAdminAuthenticated: boolean;
  activeCoupon: Coupon | null;
  totalItems: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  addToCart: (product: Product, selection: CartSelection) => { ok: boolean; message: string };
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  placeOrder: (input: PlaceOrderInput) => { ok: boolean; order?: Order; message: string };
  findOrder: (orderId: string) => Order | undefined;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
  saveProduct: (product: AdminProductInput) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
}

const CART_STORAGE_KEY = 'anashi-cart';
const PRODUCT_STORAGE_KEY = 'anashi-products';
const ORDER_STORAGE_KEY = 'anashi-orders';
const ADMIN_STORAGE_KEY = 'anashi-admin';
const COUPON_STORAGE_KEY = 'anashi-coupon';
const CATALOG_VERSION_KEY = 'anashi-catalog-version';
const CATALOG_VERSION = '2026-03-29-anashi-brand-reset';
const ADMIN_EMAIL = 'admin@anashicandles.com';
const ADMIN_PASSWORD = 'AnashiAdmin123';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const calculateProductRating = (reviews: ProductReview[]) =>
  reviews.length ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)) : 0;

const createCartItemId = (productId: string, color: string, fragrance: string, giftPackaging: boolean, customMessage: string) =>
  [productId, color, fragrance, giftPackaging ? 'gift' : 'plain', customMessage.trim().toLowerCase()].join('__');

const shouldResetCatalog = () => {
  const savedVersion = localStorage.getItem(CATALOG_VERSION_KEY);
  if (savedVersion !== CATALOG_VERSION) {
    return true;
  }

  const savedProducts = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!savedProducts) {
    return false;
  }

  try {
    const parsed = JSON.parse(savedProducts) as Product[];
    return parsed.some((product) => product.id.startsWith('aurora-') || product.price > 500);
  } catch {
    return true;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (shouldResetCatalog()) {
      localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
      localStorage.removeItem(PRODUCT_STORAGE_KEY);
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(ORDER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem(COUPON_STORAGE_KEY);
      return defaultProducts;
    }

    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(ORDER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : seededOrders;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => localStorage.getItem(ADMIN_STORAGE_KEY) === 'true');
  const [activeCouponCode, setActiveCouponCode] = useState<string | null>(() => localStorage.getItem(COUPON_STORAGE_KEY));

  useEffect(() => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
  }, []);

  useEffect(() => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (activeCouponCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, activeCouponCode);
      return;
    }
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, [activeCouponCode]);

  const activeCoupon = useMemo(() => null, []);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const discount = useMemo(() => 0, []);

  const totalPrice = Math.max(0, subtotal - discount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, selection: CartSelection) => {
    if (product.stock <= 0) {
      return { ok: false, message: 'This candle is currently out of stock.' };
    }

    const cartItemId = createCartItemId(
      product.id,
      selection.color,
      selection.fragrance,
      Boolean(selection.giftPackaging),
      selection.customMessage ?? '',
    );

    const existingItem = cart.find((item) => item.cartItemId === cartItemId);
    const nextQuantity = (existingItem?.quantity ?? 0) + selection.quantity;

    if (nextQuantity > product.stock) {
      return { ok: false, message: `Only ${product.stock} units available for this configuration.` };
    }

    setCart((currentCart) => {
      const currentItem = currentCart.find((item) => item.cartItemId === cartItemId);
      if (currentItem) {
        return currentCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + selection.quantity, stock: product.stock } : item,
        );
      }

      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: selection.quantity,
        category: product.category,
        stock: product.stock,
        selectedColor: selection.color,
        selectedFragrance: selection.fragrance,
        customMessage: selection.customMessage?.trim() ?? '',
        giftPackaging: Boolean(selection.giftPackaging),
      };

      return [...currentCart, newItem];
    });

    return { ok: true, message: `${product.name} added to cart.` };
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.cartItemId !== cartItemId) {
          return item;
        }

        return { ...item, quantity: Math.min(item.stock, quantity) };
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCouponCode(null);
  };

  const applyCoupon = (code: string) => {
    void code;
    setActiveCouponCode(null);
    return { ok: false, message: 'Prices are fixed as listed. Coupons are not available.' };
  };

  const clearCoupon = () => setActiveCouponCode(null);

  const placeOrder = ({ customer, address, paymentMethod }: PlaceOrderInput) => {
    if (!cart.length) {
      return { ok: false, message: 'Your cart is empty.' };
    }

    const hasInvalidStock = cart.some((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return !product || product.stock < item.quantity;
    });

    if (hasInvalidStock) {
      return { ok: false, message: 'One or more cart items no longer have sufficient stock.' };
    }

    const placedAt = new Date();
    const estimatedDelivery = new Date(placedAt.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const orderId = `ANASHI-${Date.now().toString().slice(-6)}`;

    const order: Order = {
      id: orderId,
      customer,
      address,
      items: cart,
      subtotal,
      discount,
      total: totalPrice,
      paymentMethod,
      status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Processing',
      placedAt: placedAt.toISOString(),
      estimatedDelivery,
      couponCode: activeCoupon?.code,
      notifications: [
        `Order confirmation email sent to ${customer.email}`,
        `${paymentMethod === 'Cash on Delivery' ? 'Order pending confirmation' : 'Payment success'} email sent`,
        'Shipping updates will be emailed automatically',
        'Delivery confirmation email scheduled',
      ],
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const matchingItem = cart.find((item) => item.productId === product.id);
        if (!matchingItem) {
          return product;
        }

        return {
          ...product,
          stock: Math.max(0, product.stock - matchingItem.quantity),
        };
      }),
    );
    clearCart();

    return { ok: true, order, message: 'Order placed successfully.' };
  };

  const findOrder = (orderId: string) => orders.find((order) => order.id.toLowerCase() === orderId.trim().toLowerCase());

  const loginAdmin = (email: string, password: string) => {
    const success = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    setIsAdminAuthenticated(success);

    if (success) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      return true;
    }

    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  const saveProduct = (productInput: AdminProductInput) => {
    setProducts((currentProducts) => {
      const existing = currentProducts.find((product) => product.id === productInput.id);
      const reviews = productInput.reviews ?? existing?.reviews ?? [];
      const nextProduct: Product = {
        ...productInput,
        reviews,
        reviewCount: reviews.length,
        rating: calculateProductRating(reviews),
      };

      if (existing) {
        return currentProducts.map((product) => (product.id === productInput.id ? nextProduct : product));
      }

      return [nextProduct, ...currentProducts];
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              notifications:
                status === order.status
                  ? order.notifications
                  : [...order.notifications, `${status} update email sent to ${order.customer.email}`],
            }
          : order,
      ),
    );
  };

  const addReview = (productId: string, reviewInput: Omit<ProductReview, 'id' | 'date'>) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        const review: ProductReview = {
          ...reviewInput,
          id: `${productId}-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          verified: false,
        };
        const reviews = [review, ...product.reviews];

        return {
          ...product,
          reviews,
          reviewCount: reviews.length,
          rating: calculateProductRating(reviews),
        };
      }),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        products,
        orders,
        coupons: defaultCoupons,
        isAdminAuthenticated,
        activeCoupon,
        totalItems,
        subtotal,
        discount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        clearCoupon,
        placeOrder,
        findOrder,
        loginAdmin,
        logoutAdmin,
        saveProduct,
        deleteProduct,
        updateOrderStatus,
        addReview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

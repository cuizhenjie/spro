// Simple localStorage-backed order store
export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  author: string;
  price: number;
  type: "buy";
  status: "completed";
  time: string;
  rarity: string;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("spro_orders") || "[]");
  } catch {
    return [];
  }
}

export function addOrder(order: Omit<Order, "id" | "time" | "status" | "type">): Order {
  const newOrder: Order = {
    ...order,
    id: "ORD_" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    type: "buy",
    status: "completed",
    time: "刚刚",
  };
  const orders = getOrders();
  orders.unshift(newOrder);
  if (typeof window !== "undefined") {
    localStorage.setItem("spro_orders", JSON.stringify(orders));
  }
  return newOrder;
}

export function getSellerOrders(): Order[] {
  // Simulate seller sees orders for their products
  return getOrders();
}

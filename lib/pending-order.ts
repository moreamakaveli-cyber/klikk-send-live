export type PendingOrder = {
  name: string;
  phone: string;
  pickup_address: string;
  delivery_address: string;
  package_size: string;
  emailParams: Record<string, string>;
};

const STORAGE_KEY = "hently_pending_order";

export function savePendingOrder(order: PendingOrder) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function loadPendingOrder(): PendingOrder | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingOrder;
  } catch {
    return null;
  }
}

export function clearPendingOrder() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

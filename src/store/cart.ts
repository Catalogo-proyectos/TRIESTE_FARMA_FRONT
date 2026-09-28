import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category?: string;
  image?: string;
  formulation?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "qty" | "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    {
      id: "whey-isolate",
      name: "Trieste Isolate Pure Bioactive",
      price: 380000,
      qty: 1,
      category: "proteina",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjxt-8a2YwR8ueZAmtUBGC49teI8zM53_YoVVi_tflVWj23gVhNwZthMd-TRSC54sdp1IDYc1f4Nxi90UP6Dsu68BcUD93fPUkxk4Nt3FUt2iBEwC1A5old6mivYoennu7dg77HAJOBnAxcW7NS57MC18nRMDSq4WOZEP2log9r1lh-iz-E45zAGmyF6lyv9LIhR3FIGp9kBm5DWABd4xg8BCxFgaFRS_oj7OBwDEttB_KmL7OHGrMZ36xg4HytZOd88",
      formulation: "28g Proteína Aislada CFM • 0% Lactosa",
    },
    {
      id: "creatine-creapure",
      name: "Creatina Monohidrato Creapure®",
      price: 260000,
      qty: 1,
      category: "creatina",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCALEd1DjzheKmjXLPAbCeYnq3z75F_T_GwDxWCFOwPnaEkOgiixbrh66AySrHgj0ec_ECQraAhtcqDof7NHRjg5QJquUJaxCLL8aSARcPaka9IXhW4tln-L1GXM3PzGMi5SIBUqNQzUmDEBBGRqxUDopkp5vlxaKLfdyhRuCl7j44UHFHSa_LnJOczAiGY_w_b_fSaLqmTsYt6w0Zsz4XsZXuhYdVrI8aS765_z0FC2cY4fY0t6cJRFA",
      formulation: "Pureza 99.9% Micronizada Mesh 200",
    },
  ],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (product) => {
    const id = product.id || product.name.toLowerCase().replace(/\s+/g, "-");
    set((state) => {
      const existing = state.items.find((i) => i.id === id || i.name === product.name);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === existing.id ? { ...i, qty: i.qty + 1 } : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [
          ...state.items,
          {
            id,
            name: product.name,
            price: product.price,
            qty: 1,
            category: product.category,
            image: product.image,
            formulation: product.formulation,
          },
        ],
        isOpen: true,
      };
    });
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id && i.name !== id),
    })),
  updateQty: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) => {
          if (i.id === id || i.name === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null),
    })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.qty, 0);
  },
  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.qty, 0);
  },
}));

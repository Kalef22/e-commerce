export type ProductVariant = {
  sku: string;
  price: number;
  stock: number;
  attributes?: {
    material?: string;
    size?: string;
    color?: string;
  };
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  mainImage: string;
  basePrice: number;
  totalStock: number;
  inStock: boolean;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  mainImage: string;
  images: string[];
  basePrice: number;
  totalStock: number;
  inStock: boolean;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};

export type ProductsResponse = {
  products: Product[];
  page: number;
  totalPages: number;
  total: number;
};


// El frontend debe tener claro qué forma tiene la respuesta del backend.
// Eso evita muchos errores y aprovecha TypeScript de verdad.

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
  description: string;
  images?: string[];
  variants: ProductVariant[];
  createdAt?: string;
};

export type ProductsResponse = {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
};

// El frontend debe tener claro qué forma tiene la respuesta del backend.
// Eso evita muchos errores y aprovecha TypeScript de verdad.
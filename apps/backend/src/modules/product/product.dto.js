export function toProductCardDTO(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    mainImage: product.mainImage,
    basePrice: product.basePrice,
    totalStock: product.totalStock,
    inStock: product.totalStock > 0,
  };
}

export function toProductDetailDTO(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    mainImage: product.mainImage,
    images: product.images,
    basePrice: product.basePrice,
    totalStock: product.totalStock,
    inStock: product.totalStock > 0,
    variants: product.variants,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
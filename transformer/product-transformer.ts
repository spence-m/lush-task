export interface ProductVariant {
  attributes: {
    attribute: {
      name: string;
      slug: string;
    };
    values: {
      name: string;
      slug: string;
    }[];
  }[];
  pricing: {
    price: {
      gross: {
        amount: number;
      };
    };
  };
}

export function transformDisplayWeight(
  variants: ProductVariant | ProductVariant[]
): string | null {
  const attributes = Array.isArray(variants)
    ? variants.length === 0
      ? null
      : variants[0].attributes
    : variants.attributes;

  if (!attributes || attributes.length === 0) {
    return null;
  }

  const hasDisplayWeight = attributes.some(
    (x: any) => x.attribute.slug === "display_weight" && x.values.length > 0
  );
  return hasDisplayWeight === true ? attributes[0].values[0].name : null;
}

export function transformDisplayPrice(
  variants: ProductVariant[]
): number | null {
  if (variants.length === 0) {
    return null;
  }

  return variants[0].pricing.price.gross.amount;
}

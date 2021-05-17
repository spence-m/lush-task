import { gql } from "@apollo/client";

import client from "../apollo-client";
import { parseParagraphs } from "../parsers/product-parser";
import {
  ProductVariant,
  transformDisplayPrice,
  transformDisplayWeight,
} from "../transformer/product-transformer";
import {
  getIdQuery,
  getProductQuery,
  getProductsQuery,
  getSlugsQuery,
} from "./queries";

export interface ProductDetail {
  id: string;
  name: string;
  paragraphs: string[];
  media: { url: string; alt: string }[];
  seoTitle: string;
  seoDescription: string;
  isAvailable: boolean;
  categoryName: string;
  categoryDescription: string;
  price: number | null;
  weight: string | null;
}

export interface Product {
  id: string;
  name: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  price: number;
  weight: string | null;
  categoryName: string;
  slug: string;
  isAvailable: boolean;
}

interface ProductData {
  products: {
    edges: {
      node: {
        id: string;
        slug: string;
        name: string;
        thumbnail: { url: string; alt: string };
        isAvailable: boolean;
        category: { name: string; description: string };
        defaultVariant: {
          attributes: {
            name: string;
            slug: string;
          };
          pricing: {
            price: {
              gross: {
                amount: number;
              };
            };
          };
        };
      };
    }[];
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data }: { data: ProductData } = await client.query({
      query: gql`
        ${getProductsQuery()}
      `,
    });
    const edges = data.products.edges;
    return edges.map(
      (edge: any): Product => {
        return {
          id: edge.node.id,
          name: edge.node.name,
          thumbnailUrl: edge.node.thumbnail.url,
          thumbnailAlt: edge.node.thumbnail.alt,
          price: edge.node.defaultVariant.pricing.price.gross.amount,
          weight: transformDisplayWeight(edge.node.defaultVariant),
          categoryName: edge.node.category.name,
          slug: edge.node.slug,
          isAvailable: edge.node.isAvailable,
        };
      }
    );
  } catch (err) {
    return [];
  }
}

interface ProductDetailData {
  products: {
    edges: {
      node: {
        id: string;
        name: string;
        isAvailable: boolean;
        category: {
          name: string;
          description: string;
        };
        description: string;
        media: {
          url: string;
          alt: string;
        }[];
        seoTitle: string;
        seoDescription: string;
        variants: ProductVariant[];
      };
    }[];
  };
}

export async function getProductDetail(
  id: string
): Promise<ProductDetail | null> {
  try {
    const { data }: { data: ProductDetailData } = await client.query({
      query: gql`
        ${getProductQuery(id)}
      `,
    });

    if (data.products.edges.length === 0) {
      return null;
    }

    const first = data.products.edges[0];

    return {
      id: first.node.id,
      name: first.node.name,
      paragraphs: parseParagraphs(first.node.description),
      media: first.node.media,
      seoTitle: first.node.seoTitle,
      seoDescription: first.node.seoDescription,
      isAvailable: first.node.isAvailable,
      categoryName: first.node.category.name,
      categoryDescription: first.node.category.description,
      weight: transformDisplayWeight(first.node.variants),
      price: transformDisplayPrice(first.node.variants),
    };
  } catch (err) {
    // Log here.

    return null;
  }
}

export async function getAllIds(): Promise<{ id: string; slug: string }[]> {
  try {
    const { data } = await client.query({
      query: gql`
        ${getIdQuery()}
      `,
    });

    return data.products.edges.map((x: any) => {
      return {
        id: x.node.id,
        slug: x.node.slug,
      };
    });
  } catch (err) {
    // Log here.

    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const { data } = await client.query({
      query: gql`
        ${getSlugsQuery()}
      `,
    });
    return data.products.edges.map((x: any) => {
      return x.node.slug;
    });
  } catch (err) {
    // Log here.

    return [];
  }
}

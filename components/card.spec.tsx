import { render, screen } from "@testing-library/react";

import { Product } from "../api/product-api";

import Card from "./card";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

it("should tell the user the product is out of stock", () => {
  const product: Product = {
    id: "test-id",
    name: "test-name",
    thumbnailUrl: "test-thumbnail-url",
    thumbnailAlt: "test-thumbnail-alt",
    price: 99,
    weight: "test-weight",
    categoryName: "test-category",
    slug: "test-slug",
    isAvailable: false,
  };

  render(<Card product={product} />);

  expect(screen.getByText("Out of stock")).toBeTruthy();
});

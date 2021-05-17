import {
  ProductVariant,
  transformDisplayPrice,
  transformDisplayWeight,
} from "./product-transformer";

it("should transform a product's display weight", () => {
  const variants: ProductVariant[] = [
    {
      attributes: [
        {
          attribute: {
            name: "Display Weight",
            slug: "display_weight",
          },
          values: [
            {
              name: "Each",
              slug: "each",
            },
          ],
        },
      ],
      pricing: {
        price: {
          gross: {
            amount: 10,
          },
        },
      },
    },
  ];

  const actual = transformDisplayWeight(variants);
  const expected = "Each";
  expect(actual).toEqual(expected);
});

it("should return null when a product has no attributes", () => {
  const variants: ProductVariant[] = [
    {
      attributes: [],
      pricing: {
        price: {
          gross: {
            amount: 10,
          },
        },
      },
    },
  ];

  const actual = transformDisplayWeight(variants);
  const expected = null;
  expect(actual).toEqual(expected);
});

it("should return null when a product does not have a display weight", () => {
  const variants: ProductVariant[] = [
    {
      attributes: [
        {
          attribute: {
            name: "Not Display Weight",
            slug: "not_display_weight",
          },
          values: [
            {
              name: "Each",
              slug: "each",
            },
          ],
        },
      ],
      pricing: {
        price: {
          gross: {
            amount: 10,
          },
        },
      },
    },
  ];

  const actual = transformDisplayWeight(variants);
  const expected = null;
  expect(actual).toEqual(expected);
});

it("should transform a product's price", () => {
  const variants: ProductVariant[] = [
    {
      attributes: [],
      pricing: {
        price: {
          gross: {
            amount: 10,
          },
        },
      },
    },
  ];

  const actual = transformDisplayPrice(variants);
  const expected = 10;
  expect(actual).toEqual(expected);
});

it("should return null when a product has no variants", () => {
  const variants: ProductVariant[] = [];

  const actual = transformDisplayPrice(variants);
  const expected = null;
  expect(actual).toEqual(expected);
});

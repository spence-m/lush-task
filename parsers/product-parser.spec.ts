import { parseParagraphs, ProductDescription } from "./product-parser";

it("should parse a product's paragraphs", () => {
  const description = `{\"blocks\": [{\"data\": {\"text\": \"Treat yourself or a loved one to an indulgent rub down with naked massage bars, bulging with rich butters and exquisite essential oils.\"}, \"type\": \"paragraph\"}]}`;

  const actual = parseParagraphs(description);

  const expected = [
    "Treat yourself or a loved one to an indulgent rub down with naked massage bars, bulging with rich butters and exquisite essential oils.",
  ];
  expect(actual).toEqual(expected);
});

it("should return an empty array when a product's paragraphs cannot be parsed", () => {
  const description = "bad json string";

  const actual = parseParagraphs(description);

  const expected: ProductDescription[] = [];
  expect(actual).toEqual(expected);
});

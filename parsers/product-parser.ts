interface ProductDescriptionBlock {
  data: {
    text: string;
  };
  type: string;
}

export interface ProductDescription {
  time: number;
  blocks: ProductDescriptionBlock[];
}

export function parseParagraphs(description: string): string[] {
  try {
    const parsed: ProductDescription = JSON.parse(description);
    if (parsed.blocks.length === 0) {
      return [];
    }

    const paragraphs = parsed.blocks
      .filter((x) => x.type === "paragraph")
      .map((x) => x.data.text);

    return paragraphs;
  } catch (err) {
    // Log here.
    return [];
  }
}

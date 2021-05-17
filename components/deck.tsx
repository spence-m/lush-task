import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../api/product-api";

import Card from "./card";

interface DeckProps {
  products: Product[];
}

export default function Deck(props: DeckProps): JSX.Element {
  return (
    <div className="inline-flex flex-wrap justify-center gap-6">
      {props.products.map((product) => (
        <Card key={uuidv4()} product={product} />
      ))}
    </div>
  );
}

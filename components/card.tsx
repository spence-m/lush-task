import Image from "next/image";
import Link from "next/link";

import { Product } from "../api/product-api";

interface CardProps {
  product: Product;
}

function renderOutOfStockText(props: CardProps) {
  if (props.product.isAvailable === true) {
    return null;
  }

  return (
    <p className="text-sm uppercase font-semibold text-gray-800 tracking-wider">
      Out of stock
    </p>
  );
}

export default function Card(props: CardProps): JSX.Element {
  return (
    <Link href={`/products/${props.product.slug}`}>
      <div
        className={`flex flex-col items-center min-w-xs w-72 max-w-xs shadow-md rounded p-4 mr-6 mb-6 cursor-pointer bg-white ${
          props.product.isAvailable === false
            ? "filter opacity-70"
            : "hover:shadow-xl duration-300 ease-in-out"
        }`}
      >
        <div>
          <Image
            src={props.product.thumbnailUrl}
            alt={props.product.thumbnailAlt}
            width={255}
            height={255}
          />
        </div>
        <div className="w-full">
          <h1
            className={`text-2xl uppercase tracking-wider mb-4 ${
              props.product.isAvailable === false
                ? "text-gray-500"
                : "text-gray-700"
            }`}
          >
            {props.product.name}
          </h1>
          <p
            className={`text-xl font-bold mb-2 ${
              props.product.isAvailable === false
                ? "text-gray-500"
                : "text-gray-700"
            }`}
          >
            £{props.product.price}
            {props.product.weight === null ? "" : ` / ${props.product.weight}`}
          </p>
          <p
            className={`text-sm uppercase tracking-wider mb-2 ${
              props.product.isAvailable === false
                ? "text-gray-500"
                : "text-gray-700"
            }`}
          >
            {props.product.categoryName}
          </p>
          {renderOutOfStockText(props)}
        </div>
      </div>
    </Link>
  );
}

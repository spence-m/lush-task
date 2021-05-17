import React from "react";

import { getProducts, Product } from "../api/product-api";
import Deck from "../components/deck";
import Layout from "../components/layout";
interface HomeProps {
  products: Product[];
}

export default function Home(props: HomeProps) {
  return (
    <Layout>
      <div>
        <Deck products={props.products} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      products: await getProducts(),
    },
  };
}

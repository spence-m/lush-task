import React from "react";
import ErrorPage from "next/error";

import { getProducts, Product } from "../api/product-api";
import Deck from "../components/deck";
import Layout from "../components/layout";
interface HomeProps {
  products: Product[];
}

export default function Home(props: HomeProps) {
  if (!props.products) {
    return <ErrorPage statusCode={500} />;
  }

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

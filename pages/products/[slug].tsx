import React from "react";
import Image from "next/image";
import ErrorPage from "next/error";
import { v4 as uuidv4 } from "uuid";

import {
  getAllIds,
  getAllSlugs,
  getProductDetail,
  ProductDetail,
} from "../../api/product-api";
import Layout from "../../components/layout";

interface ProductProps {
  detail: ProductDetail;
}

export default function Product(props: ProductProps) {
  if (!props.detail) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="max-w-5xl flex flex-row">
          <div className="flex flex-col flex-1 p-4">
            <h1 className="text-4xl uppercase tracking-wider pb-6 text-gray-700">
              {props.detail.name}
            </h1>
            <h2 className="text-l uppercase tracking-wider pb-4 text-gray-700">
              {props.detail.categoryName}
            </h2>
            <div>
              <Image
                width={250}
                height={250}
                src={
                  props.detail.media.length === 0
                    ? ""
                    : props.detail.media[0].url
                }
                alt={
                  props.detail.media.length === 0
                    ? ""
                    : props.detail.media[0].alt
                }
              />
            </div>
            <div>
              <p className="text-xl font-bold pb-4 text-gray-700">
                £{props.detail.price}
                {props.detail.weight === null
                  ? ""
                  : ` / ${props.detail.weight}`}
              </p>
              <input
                className={`${
                  props.detail.isAvailable === true
                    ? "bg-yellow-400 hover:bg-yellow-300 cursor-pointer"
                    : "bg-gray-300"
                } p-3 rounded-lg font-base font-semibold text-gray-700`}
                type="button"
                value={
                  props.detail.isAvailable === true
                    ? "Add to basket"
                    : "Out of stock"
                }
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 p-4">
            {props.detail.paragraphs.map((x) => (
              <p
                key={uuidv4()}
                className="text-lg pb-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: x }}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  const slugs = await getAllSlugs();

  const slug = slugs.find((x: string) => x === params.slug);

  if (!slug) {
    return {
      props: {
        slug: null,
        detail: null,
      },
    };
  }

  const ids = await getAllIds();

  const id = ids.find((x: any) => x.slug === params.slug)?.id;

  if (!id) {
    return {
      props: {
        slug,
        detail: null,
      },
    };
  }

  const detail = await getProductDetail(id);

  return {
    props: {
      slug,
      detail,
    },
  };
}

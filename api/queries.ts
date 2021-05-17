export function getProductsQuery() {
  return `
  query Products {
    products(channel: "uk", first: 100) {
      edges {
        node {
          id
          slug
          name
          thumbnail {
            url
            alt
          }
          isAvailable
          category {
            name
            description
          }
          defaultVariant {
            attributes {
              attribute {
                name
                slug
              }
              values {
                name
                slug
              }
            }
            pricing {
              price {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
}

export function getProductQuery(id: string) {
  return `
    query Product {
      products(
        channel: "uk"
        filter: { ids: ["${id}"] }
        first: 1
      ) {
        edges {
          node {
            id
            name
            isAvailable
            category {
              name
              description
            }
            description
            media {
              url
              alt
            }
            seoTitle
            seoDescription
            variants {
              attributes {
                attribute {
                  name
                  slug
                }
                values {
                  name
                  slug
                }
              }
              pricing {
                price {
                  gross {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
}

export function getIdQuery() {
  return `
      query Ids {
        products(channel: "uk", first: 100) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `;
}

export function getSlugsQuery() {
  return `
  query Slugs {
    products(channel: "uk", first: 100) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;
}

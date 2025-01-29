
import { fetchAPI } from "../fetchAPI";

export async function getAllCategoriesWithSlug() {
    const data = await fetchAPI(`
      {
        categories(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.categories;
}


export async function getCategory(slug) {
  
    const data = await fetchAPI(
      `
      fragment CategoryFields on Category {
        slug
      }
      query CategoryBySlug($id: ID!, $idType: CategoryIdType!) {
        category(id: $id, idType: $idType) {
          ...CategoryFields
        }
      }
      `,
      {
        variables: {
          id: slug,
          idType: "SLUG",
        },
      },
    );

    return data;
  }
  

import { fetchAPI } from "../fetchAPI";
import { BLOCK_SECTION_IMAGE_TEXT, BLOCK_RELATION_LISTS, BLOCK_FEATURES_LISTS, BLOCK_SECTION_TEXT, BLOCK_SECTION_ACCORDION } from "./block/fragments";


export async function getPreviewWork(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewWork($id: ID!, $idType: WorkIdType!) {
      work(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }
    `,
    {
      variables: { id, idType },
    }
  );
  return data?.work;
}


const GET_GALLERIES_QUERY = `
 query GET_GALLERIES {
  galleries {
    nodes {
    id
      galleries {
        date
        place
        image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
 }
`;

export async function getAllFilters() {
  const data = await fetchAPI(`
    {
      productTags(first: 100) {
        edges {
          node {
            id
            name
            slug
            parentId
            children {
              edges {
                node {
                  databaseId
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
      brands {
        nodes {
          id
          name
          slug
        }
      }
      productCategories {
        edges {
            node {
              id
              name
              slug
          }
        }
      }
    }
  `);
  const filteredCategories = data.productCategories.edges.filter(
    (category) => category.node.slug !== "produits"
  );
  const extendedCategories = [
    { node: { slug: "", name: "Tout" } },
    ...filteredCategories,
  ];
  return {
    ...data,
    productCategories: {
      edges: extendedCategories,
    },
  };
  return data;
}

export async function getAllGalleries() {
  const data = await fetchAPI(GET_GALLERIES_QUERY);
  return data?.galleries;
}


export async function getAllWorksWithSlug() {
  const data = await fetchAPI(`
    {
      works(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.works;
}


export async function getWorkAndMoreWorks(slug, preview, previewData) {
  const workPreview = preview && previewData?.work;
  // The slug may be the id of an unpublished work
  const isId = Number.isInteger(Number(slug));
  const isSameWork = isId
    ? workPreview && Number(slug) === workPreview.id
    : workPreview && slug === workPreview.slug;
  const isDraft = isSameWork && workPreview?.status === "draft";

  const data = await fetchAPI(
    `
    fragment WorkFields on Work {
      title
      slug
      date
      seo {
        title
        metaDesc
        fullHead
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      blocks {
        content {
          ${BLOCK_SECTION_TEXT}
          ${BLOCK_SECTION_IMAGE_TEXT}
          ${BLOCK_RELATION_LISTS}
          ${BLOCK_FEATURES_LISTS}
          ${BLOCK_SECTION_ACCORDION}
        }
      }
      works {
        gallery {
           nodes {
            id
            sourceUrl
            altText
          }
        }
        link
        description
        rating
        price
        details {
          title
          list {
            listItem
          }
        }
      }
      productCategories {
        edges {
          node {
            name
            slug
          }
        }
      }
      productTags {
        edges {
          node {
            name
          }
        }
      }
    }
    query WorkBySlug($id: ID!, $idType: WorkIdType!) {
      work(id: $id, idType: $idType) {
        ...WorkFields
        content
      }
      works(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...WorkFields
          }
        }
      }
    }
    `,
    {
      variables: {
        id: isDraft ? workPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    },
  );

  // Draft works may not have a slug
  if (isDraft) data.work.slug = workPreview.id;

  // Filter out the main work
  data.works.edges = data.works.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 works, remove the last one
  if (data.works.edges.length > 2) data.works.edges.pop();

  return data;
}

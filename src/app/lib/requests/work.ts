
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


const GET_WORKS_QUERY = `
  query GET_WORKS {
    works(first: 100) {
      nodes {
        id
        slug
      works {
        context
        date
        description
        role
        video {
          node {
            mediaItemUrl
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

export async function getAllWorks() {
  const data = await fetchAPI(GET_WORKS_QUERY);
  return data?.works;
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


export async function getWorkBySlug(slug) {
  const isId = Number.isInteger(Number(slug));

  const data = await fetchAPI(
    `
    fragment WorkFields on Work {
      id
      title
      workCategories {
      nodes {
        name
      }
    }
      works {
        context
        date
        description
        role
        github_link {
          title
           url
        }
        projectLink {
          title
          url
        }
        video {
          node {
            mediaItemUrl
          }
        }
          skillsSection {
        ... on WorksSkillsSectionSkillslogoLayout {
          heading
          skills {
            nodes {
              ... on Skill {
                id
                title
                skillsLayers {
                  nodes {
                    name
                     dataLayer {
                      background
                      color
                    }
                  }
                }
                skills {
                  colisionImage {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        }
  }
        gallery {
        ... on WorksGalleryOneLayout {
          __typename
          oneByOne {
            node {
              altText
              sourceUrl
            }
          }
        }
        ... on WorksGalleryTwoLayout {
          __typename
          left {
            node {
              altText
              sourceUrl
            }
          }
          right {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      }
    }
    query WorkBySlug($id: ID!, $idType: WorkIdType!) {
      work(id: $id, idType: $idType) {
        ...WorkFields
      }
    }
    `,
    {
      variables: {
        id: isId ? slug : slug,
        idType: isId ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  const work = data?.work || null;

  return { work };
}

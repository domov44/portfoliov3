
import { fetchAPI } from "../fetchAPI";
import { BLOCK_FEATURES_LISTS, BLOCK_RELATION_LISTS, BLOCK_SECTION_ACCORDION, BLOCK_SECTION_GALLERIES_HIGHLIGHT, BLOCK_SECTION_IMAGE_TEXT, BLOCK_SECTION_SKILLS_COLISION, BLOCK_SECTION_TEXT, BLOCK_SECTION_WORKS_HIGHLIGHT, BLOCK_WORKS_THUMBNAIL_TRACK_MOUSE } from "./block/fragments";

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
      {
        pages(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
  return data?.pages;
}

export async function getPreviewPage(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPage($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
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
  return data?.page;
}


export async function getPage(slug, preview, previewData) {
  const pagePreview = preview && previewData?.page;

  const isId = Number.isInteger(Number(slug));
  const isSamePage = isId
    ? pagePreview && Number(slug) === pagePreview.id
    : pagePreview && slug === pagePreview.slug;
  const isDraft = isSamePage && pagePreview?.status === "draft";

  const data = await fetchAPI(
    `
      fragment PageFields on Page {
        title
        slug
        date
        datapage {
          description
          link
        }
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
            ${BLOCK_WORKS_THUMBNAIL_TRACK_MOUSE}
            ${BLOCK_SECTION_ACCORDION}
            ${BLOCK_SECTION_GALLERIES_HIGHLIGHT}
            ${BLOCK_SECTION_WORKS_HIGHLIGHT}
            ${BLOCK_SECTION_SKILLS_COLISION}
          }
        }
      }
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
        }
      }
      `,
    {
      variables: {
        id: isDraft ? pagePreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "URI",
      },
    },
  );

  if (isDraft) data.page.slug = pagePreview.id;

  return data;
}

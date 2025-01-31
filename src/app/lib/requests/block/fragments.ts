export const BLOCK_SECTION_SKILLS_COLISION = `
  ... on BlocksContentMatterJsLayout {
          __typename
          heading
          skillsLogo {
            nodes {
              ... on Skill {
                id
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
`;

export const BLOCK_SECTION_IMAGE_TEXT = `
  ... on BlocksContentSectionImageTexteLayout {
    __typename
     direction
          fieldGroupName
          heading
          scroll
          variant
          text
          button {
            title
            url
          }
          image {
            node {
              altText
              sourceUrl
            }
          }
          link {
            title
            url
    }
  }
`;

export const BLOCK_SECTION_WORKS_HIGHLIGHT = `
  ... on BlocksContentWorkHighlightLayout {
      __typename
          heading
          button{
          title
            url
          }
          works {
            nodes {
              ... on Work {
                id
                slug
                works {
                  video {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
`;

export const BLOCK_SECTION_GALLERIES_HIGHLIGHT = `
  ... on BlocksContentGalleryHighlightLayout {
    __typename
     heading
          backgroundImage {
            node {
              altText
              sourceUrl
            }
          }
          galleries {
            nodes {
              ... on Gallery {
                id
                galleries {
                  image {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
          link {
            title
            url
          }
          text
  }
`;

export const BLOCK_SECTION_ACCORDION = `
  ... on BlocksContentSectionAccordionLayout {
    __typename
    text
    accordion {
      text
      label
    }
  }
`;

export const BLOCK_SECTION_TEXT = `
  ... on BlocksContentSectionTextLayout {
    __typename
    text
  }
`;

export const BLOCK_RELATION_LISTS = `
  ... on BlocksContentRelationListsLayout {
    __typename
    text
    postType {
      nodes {
        ... on Work {
          id
          contentTypeName
          title
          works{
          context
        date
        description
        role
        thumbnail {
          node {
            altText
            sourceUrl
          }
        }
          }
        }
        ... on Post {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
        ... on Page {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const BLOCK_WORKS_THUMBNAIL_TRACK_MOUSE = `
  ... on BlocksContentWorksThumbnailTrackMouseLayout {
    __typename
    heading
    centerText
    rightUrl {
     url
     title
    }
     leftUrl {
     url
     title
    }
    postType {
      nodes {
        ... on Work {
          id
          contentTypeName
          title
          works{
          context
        date
        description
        role
        thumbnail {
          node {
            altText
            sourceUrl
          }
        }
          }
        }
        ... on Post {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
        ... on Page {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;



export const BLOCK_FEATURES_LISTS = `
  ... on BlocksContentFeaturesListsLayout {
  __typename
    direction
    text
    listImage {
      image {
        node {
          altText
          sourceUrl
        }
      }
    }
    listText {
      text
    }
  }
`;

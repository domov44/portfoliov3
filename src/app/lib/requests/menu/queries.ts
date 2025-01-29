
import { fetchAPI } from "../../fetchAPI";

export async function getHeader() {
    const data = await fetchAPI(GET_HEADER_QUERY);
    return data?.menu;
}
export async function getFooter() {
    const data = await fetchAPI(GET_FOOTER_QUERY);
    return data?.menu;
}
const GET_HEADER_QUERY = `
    query GET_HEADER {
        menu(id: "header-menu", idType: LOCATION) {
            datamenu {
                logo {
                    node {
                        altText
                        sourceUrl
                    }
                }
            }
            menuItems {
                edges {
                    node {
                        id
                        parentId
                        label
                        uri
                        datamenuitem {
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
        }
    }
`;

const GET_FOOTER_QUERY = `
    query GET_FOOTER {
        menu(id: "footer-menu", idType: LOCATION) {
            datamenu {
                logo {
                    node {
                        altText
                        sourceUrl
                    }
                }
            }
            menuItems {
                edges {
                    node {
                        id
                        parentId
                        label
                        uri
                    }
                }
            }
        }
    }
`;
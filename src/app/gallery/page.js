import GalleriesGrid from '../components/pageElements/gallery/GalleriesGrid';
import { getAllGalleries } from '../lib/requests/gallery';
import MainContent from "../layouts/MainContent";

export async function generateMetadata() {
  return {
    title: "Gallery - Ronan Scotet",
    description: "Explore a selection of visual galleries captured by Ronan Scotet.",
    openGraph: {
      title: "Gallery - Ronan Scotet",
      description: "Explore a selection of visual galleries captured by Ronan Scotet.",
      url: "https://www.ronanscotet.com/galleries",
      type: "website",
      images: [
        {
          url: "https://www.ronanscotet.com/images/ronanscotet_website.png",
          width: 1200,
          height: 675,
          alt: "Visual gallery by Ronan Scotet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery - Ronan Scotet",
      description: "Explore a selection of visual galleries captured by Ronan Scotet.",
      images: ["https://www.ronanscotet.com/images/ronanscotet_website.png"],
    },
  };
}

export default async function Page() {
  let galleriesElements = [];

  try {
    const galleries = await getAllGalleries();
    const nodes = galleries?.nodes || [];

    galleriesElements = nodes.map(node => ({
      id: node.id || '',
      alt: node.galleries?.image?.node?.altText || '',
      date: node.galleries?.date || '',
      place: node.galleries?.place || '',
      url: node.galleries?.image?.node?.sourceUrl || ''
    }));

    if (galleriesElements.length < 15) {
      const items = [...galleriesElements];
      while (items.length < 15) {
        const randomIndex = Math.floor(Math.random() * galleriesElements.length);
        const originalGallery = galleriesElements[randomIndex];

        items.push({
          ...originalGallery,
          id: `${originalGallery.id}-duplicate-${items.length}`,
          place: `${originalGallery.place}`,
          date: originalGallery.date,
          url: originalGallery.url,
          alt: originalGallery.alt
        });
      }
      galleriesElements = items;
    }

  } catch (error) {
    console.error('Error while fetching galleries:', error);
  }

  return (
    <MainContent>
      <GalleriesGrid galleriesElements={galleriesElements} />
    </MainContent>
  );
}

export const dynamic = 'force-dynamic';

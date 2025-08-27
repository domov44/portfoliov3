import { getPage } from '../lib/requests/web_page';
import MainContent from '../layouts/MainContent';
import ComponentAdapter from '../components/adapter/componentAdapter';

export async function generateMetadata({ params, searchParams }) {
  const data = await getPage(params.slug || 'about-me', searchParams);
  const page = data?.page;

  const title = page?.seo?.title || 'Ronan Scotet - fullstack and devops developer';
  const description = page?.seo?.metaDesc || 'Hey im Ronan, come to see my portfolio made with love :D.';
  const ogImage = page?.featuredImage?.node?.sourceUrl || '/images/ronanscotet_website.png';

  return {
    metadataBase: new URL('https://www.ronanscotet.com'),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: page?.featuredImage?.node?.altText || 'Aperçu de Ronan Scotet Portfolio',
        },
      ],
    },
  };
}

export default async function Page({ searchParams, params }) {
  const data = await getPage(params.slug || 'about-me', searchParams);
  const page = data?.page;
  const contentPage = page?.blocks?.content || [];

  return (
    <MainContent>
      {contentPage.map((block, index) => (
        <ComponentAdapter 
          key={index} 
          typename={block.__typename} 
          data={block} 
        />
      ))}
    </MainContent>
  );
}

export const dynamic = 'force-dynamic';

import { getPage } from './lib/requests/web_page';
import MainContent from './layouts/MainContent';
import HomeHero from './components/pageElements/home/HomeHero'

export default async function Page({ searchParams }) {
    const preview = searchParams?.preview === 'true';
    const data = await getPage('home', preview, searchParams);
    const page = data?.page;

    const contentBlock = page?.blocks?.content?.[0];

    const images = contentBlock?.postType?.nodes?.map(node => ({
        alt: node.works?.thumbnail?.node?.altText || '',
        sourceUrl: node.works?.thumbnail?.node?.sourceUrl || ''
    })) || [];

    const heading = contentBlock?.heading || '';
    const leftUrl = {
        title: contentBlock?.leftUrl?.title || '',
        url: contentBlock?.leftUrl?.url || ''
    };
    const rightUrl = {
        title: contentBlock?.rightUrl?.title || '',
        url: contentBlock?.rightUrl?.url || ''
    };
    const centerText = contentBlock?.centerText || '';

    return (
        <MainContent>
            <HomeHero
                images={images}
                heading={heading}
                leftUrl={leftUrl}
                rightUrl={rightUrl}
                centerText={centerText}
            />
        </MainContent>
    );
}
import { getPage } from './lib/requests/web_page';
import MainContent from './layouts/MainContent';
import ComponentAdapter from './components/adapter/componentAdapter';

export default async function Page({ searchParams }) {
    const data = await getPage('home', searchParams);
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

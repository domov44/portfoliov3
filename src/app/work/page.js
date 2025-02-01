import MainContent from "../layouts/MainContent";
import ProjectsList from '../components/pageElements/work/ProjectsList';
import { getAllWorks } from '../lib/requests/work';

export default async function Page() {
    let worksElements = [];

    try {
        const works = await getAllWorks();
        const nodes = works?.nodes || [];

        worksElements = nodes
            .map(node => ({
                id: node.id || '',
                slug: node.slug,
                videoUrl: node.works?.video?.node?.mediaItemUrl || '',
                date: node.works?.date || ''
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

    } catch (error) {
        console.error('Erreur lors de la récupération des galeries:', error);
    }

    return (
        <MainContent>
            <ProjectsList worksElements={worksElements} />
        </MainContent>
    );
}

export const dynamic = 'force-dynamic';
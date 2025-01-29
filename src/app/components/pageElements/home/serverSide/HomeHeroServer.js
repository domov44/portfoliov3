import HomeHero from '../HomeHero';
import { getAllWorks } from '../../../../lib/requests/work';

export default async function HomeHeroServer() {
    let images = [];

    try {
        const works = await getAllWorks();
        const nodes = works?.nodes || [];

        images = nodes.map(node => ({
            alt: node.works?.thumbnail?.node?.altText || '',
            sourceUrl: node.works?.thumbnail?.node?.sourceUrl || ''
        }));

    } catch (error) {
        console.error('Erreur lors de la récupération des galeries:', error);
    }

    return <HomeHero images={images} />;
}
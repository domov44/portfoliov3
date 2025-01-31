
import GalleriesGrid from '../components/pageElements/gallery/GalleriesGrid';
import { getAllGalleries } from '../lib/requests/gallery';
import MainContent from "../layouts/MainContent";
import Section from '../components/ui/wrapper/Section';

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

        console.log(galleriesElements.length)

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
        console.error('Erreur lors de la récupération des galeries:', error);
    }

    return (
        <MainContent>
            <Section className="align_start h100vh justify_start space-0" fullWidth>
                <GalleriesGrid galleriesElements={galleriesElements} />
            </Section>
        </MainContent>
    );
}

export const dynamic = 'force-dynamic'
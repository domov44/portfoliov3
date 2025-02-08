import { getAllGalleries } from '../lib/requests/gallery';
import MainContent from '../layouts/MainContent';
import Image from 'next/image';

export default async function Page() {
    let galleriesElements = [];

    try {
        const galleries = await getAllGalleries();
        const nodes = galleries?.nodes || [];

        galleriesElements = nodes.map(node => ({
            id: node.id || '',
            alt: node.galleries?.image?.node?.altText || 'Image de la galerie',
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
        console.error('Erreur lors de la récupération des galeries:', error);
    }

    return (
        <MainContent>
            <ul className="grid grid-cols-3 gap-4 p-4">
                {galleriesElements.map(gallery => (
                    <li key={gallery.id}>
                        <picture className="border rounded-lg overflow-hidden shadow-md">
                            <Image
                                src={gallery.url}
                                alt={gallery.alt}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-2">
                                <p className="font-bold">{gallery.place}</p>
                                <p className="text-sm text-gray-500">{gallery.date}</p>
                            </div>
                        </picture>
                    </li>
                ))}
            </ul>
        </MainContent>
    );
}

export const dynamic = 'force-dynamic';

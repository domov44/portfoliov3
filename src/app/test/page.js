import { getAllGalleries } from '../lib/requests/gallery';
import MainContent from '../layouts/MainContent';
import Image from 'next/image';
import styles from './page.module.css'

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
            <section className={styles.section}>
                <ul className={styles.GalleryGridList}>
                    {galleriesElements.map(gallery => (
                        <li key={gallery.id} className={styles.GalleryGridListItem}>
                            <picture className={styles.GalleryPicture}>
                                <Image
                                    src={gallery.url}
                                    alt={gallery.alt}
                                    width={300}
                                    height={200}
                                    className={styles.GalleryImage}
                                />
                                <div className="p-2">
                                    <p className="font-bold">{gallery.place}</p>
                                    <p className="text-sm text-gray-500">{gallery.date}</p>
                                </div>
                            </picture>
                        </li>
                    ))}
                </ul>
            </section>
        </MainContent>
    );
}

export const dynamic = 'force-dynamic';

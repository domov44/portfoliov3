import MainContent from '../../layouts/MainContent';
import Image from 'next/image';
import styles from './Test.module.css'

export default async function Test({galleriesElements}) {
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

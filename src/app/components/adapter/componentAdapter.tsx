import HomeHero from "../blocks/HomeHero";
import ImageText from "../blocks/ImageText";
import HomeTravel from "../pageElements/home/HomeTravel";

export default function ComponentAdapter({ data, typename }) {
    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (
                <ImageText
                    content={data}
                />
            );
        case 'BlocksContentWorksThumbnailTrackMouseLayout':
            return (
                <HomeHero
                    heading={data.heading}
                    images={data.postType?.nodes?.map(node => ({
                        alt: node.works?.thumbnail?.node?.altText || '',
                        sourceUrl: node.works?.thumbnail?.node?.sourceUrl || ''
                    })) || []}
                    leftUrl={data.leftUrl}
                    rightUrl={data.rightUrl}
                    centerText={data.centerText}
                />
            );
        case 'BlocksContentGalleryHighlightLayout':
            return (
                <HomeTravel
                    heading={data.heading}
                    background={data.backgroundImage?.node ? [{
                        alt: data.backgroundImage.node.altText || '',
                        sourceUrl: data.backgroundImage.node.sourceUrl || ''
                    }] : []}
                    gallery={data.galleries?.nodes?.map(gallery => ({
                        id: gallery.id,
                        images: gallery.galleries?.image ? [{
                            alt: gallery.galleries.image.node?.altText || '',
                            sourceUrl: gallery.galleries.image.node?.sourceUrl || ''
                        }] : []
                    })) || []}
                    link={{ title: data.link?.title || '', url: data.link?.url || '' }}
                    text={data.text}
                />
            );
        default:
            return null;
    }
}

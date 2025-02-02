import HomeHero from "../blocks/HomeHero";
import ImageText from "../blocks/ImageText";
import ImageTextParallax from "../blocks/ImageTextParallax";
import WorkGrid from "../blocks/WorkGrid";
import MatterShapes from '../blocks/MatterShapes'
import GalleriesHighlight from "../blocks/GalleriesHighlight";
import AboutMeHero from "../blocks/AboutMeHero";
import TextTextSection from "../blocks/TextTextSection";
import SectionTextQuadrupleImage from "../blocks/SectionTextQuadrupleImage";

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
                <GalleriesHighlight
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
        case 'BlocksContentMatterJsLayout':
            return (
                <MatterShapes
                    heading={data.heading}
                    images={data.skillsLogo?.nodes?.map(skill => skill.skills?.colisionImage?.node?.sourceUrl) || []}
                />
            );
        case 'BlocksContentWorkHighlightLayout':
            return (
                <WorkGrid
                    button={{ title: data.button.title, url: data.button.url }}
                    heading={data.heading}
                    videos={
                        data.works?.nodes?.map(work => ({
                            id: work.id,
                            slug: work.slug,
                            video: work.works?.video
                                ? [{ mediaItemUrl: work.works.video.node?.mediaItemUrl || '' }]
                                : []
                        })) || []
                    }
                />
            );
        case 'BlocksContentClassicHeroLayout':
            return (
                <AboutMeHero
                    leftUrl={data.leftUrl}
                    rightUrl={data.rightUrl}
                    heading={data.heading}
                />
            );
        case 'BlocksContentSectionImageTextParallaxLayout':
            return (
                <ImageTextParallax
                    direction={data.direction}
                    heading={data.heading}
                    button={data.button}
                    backgroundImage={data.backgroundImage.node}
                    image={data.image.node}
                    link={data.link}
                    text={data.text}
                />
            );
        case 'BlocksContentSectionTextTextLayout':
            return (
                <TextTextSection
                    left={data.left}
                    right={data.right}
                />
            );
        case 'BlocksContentSectionHeadingQuadrupleImageLayout':
            return (
                <SectionTextQuadrupleImage
                    heading={data.heading}
                    text={data.text}
                    bento={Object.values({
                        topLeftImage: data.topLeftImage,
                        topRightImage: data.topRightImage,
                        bottomLeftImage: data.bottomLeftImage,
                        bottomRightImage: data.bottomRightImage,
                    })}
                />
            );
        default:
            return null;
    }
}

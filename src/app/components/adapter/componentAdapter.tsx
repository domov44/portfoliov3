import HomeHero from "../pageElements/home/HomeHero";
import HomeSecondSection from "../pageElements/home/HomeSecondSection";

export default function ComponentAdapter({ data, typename }) {
    switch (typename) {
        case 'BlocksContentSectionImageTexteLayout':
            return (
                <HomeSecondSection
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
        default:
            return null;
    }
}

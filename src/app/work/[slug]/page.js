import { notFound } from 'next/navigation';
import { getWorkBySlug } from '../../lib/requests/work';
import MainContent from "../../layouts/MainContent";
import SingleHero from "../../components/pageElements/work/single/SingleHero"
import SingleVideoSection from "../../components/pageElements/work/single/SingleVideoSection"
import MatterShapes from '../../components/blocks/MatterShapes';
import SingleMainSection from "../../components/pageElements/work/single/SingleMainSection"
import SingleDoubleSection from "../../components/pageElements/work/single/SingleDoubleSection"
import SingleDescription from "../../components/pageElements/work/single/SingleDescription"

async function Page({ params }) {
    const { slug } = await params;

    let workData = null;
    try {
        workData = await getWorkBySlug(slug);
    } catch (error) {
        console.error('Erreur lors de la récupération du travail:', error);
    }

    if (!workData || workData.work === null) {
        notFound();
    }

    const work = workData.work

    return (
        <MainContent>
            <SingleHero category={work.workCategories.nodes[0].name} title={work.title} href={work.works.projectLink.url} github={work.works.github_link && work.works.github_link.url} context={work.works.context} role={work.works.role} date={work.works.date} />
            {work.works.video.node.mediaItemUrl && <SingleVideoSection video={work.works.video.node.mediaItemUrl} />}
            <SingleDescription description={work.works.description} />
            <MatterShapes
                heading={work.works.skillsSection[0].heading && work.works.skillsSection[0].heading}
                images={work.works?.skillsSection[0].skills.nodes.map(skill => ({
                    url: skill.skills?.colisionImage?.node?.sourceUrl,
                    label: skill?.title,
                    layer: skill?.skillsLayers?.nodes[0]?.name,
                    background: skill?.skillsLayers?.nodes[0]?.dataLayer?.background,
                    color: skill?.skillsLayers?.nodes[0]?.dataLayer?.color
                })) || []
                } />
            {work.works.gallery && work.works.gallery.map((row, index) => {
                switch (row.__typename) {
                    case "WorksGalleryOneLayout":
                        return <SingleMainSection key={index} image={row.oneByOne.node} />;

                    case "WorksGalleryTwoLayout":
                        return (
                            <SingleDoubleSection
                                key={index}
                                left_image={row.left.node}
                                right_image={row.right.node}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </MainContent>
    );
}

export const dynamic = 'force-dynamic';

export default Page;

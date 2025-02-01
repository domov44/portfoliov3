import { notFound } from 'next/navigation';
import { getWorkBySlug } from '../../lib/requests/work';
import MainContent from "../../layouts/MainContent";
import SingleHero from "../../components/pageElements/work/single/SingleHero"
import SingleVideoSection from "../../components/pageElements/work/single/SingleVideoSection"
import Section from '../../components/ui/wrapper/Section';
import Stack from '../../components/ui/wrapper/Stack';
import Title from '../../components/ui/textual/Title';
import Text from '../../components/ui/textual/Text';

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
            <Section>
                <Stack direction="column" width="100%" className="align_center">
                    <Title level={3} className="step-3 text_align_center default">Description of the project</Title>
                    <Text textalign="center" maxwidth={"40vw"}>{work.works.description}</Text>
                </Stack>
            </Section>
        </MainContent>
    );
}

export const dynamic = 'force-dynamic';

export default Page;

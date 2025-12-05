import { notFound } from 'next/navigation';
import { getWorkBySlug } from '../../lib/requests/work';
import MainContent from "../../layouts/MainContent";
import SingleHero from "../../components/pageElements/work/single/SingleHero"
import SingleVideoSection from "../../components/pageElements/work/single/SingleVideoSection"
import MatterShapes from '../../components/blocks/MatterShapes';
import SingleMainSection from "../../components/pageElements/work/single/SingleMainSection"
import SingleDoubleSection from "../../components/pageElements/work/single/SingleDoubleSection"
import SingleDescription from "../../components/pageElements/work/single/SingleDescription"

async function getWorkCached(slug) {
  try {
    return await getWorkBySlug(slug);
  } catch (error) {
    console.error('Erreur lors de la récupération du travail:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const workData = await getWorkCached(slug);
  const work = workData?.work;
  if (!work) return {};

  const title = work.seo?.title || work.title || 'Ronan Scotet - Work';
  const description =
    work.seo?.metaDesc ||
    work.works?.description?.substring(0, 160) ||
    'Projet développé par Ronan Scotet.';
  const ogImage =
    work.featuredImage?.sourceUrl ||
    'https://www.ronanscotet.com/images/ronanscotet_website.png';

  return {
    metadataBase: new URL('https://www.ronanscotet.com'),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.ronanscotet.com/work/${slug}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          alt: work.featuredImage?.altText || work.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

async function Page({ params }) {
  const { slug } = await params;

  const workData = await getWorkCached(slug);

  if (!workData || workData.work === null) {
    notFound();
  }

  const work = workData.work;

  const layers = Array.from(
    new Map(
      work?.works?.skillsSection[0].skills.nodes
        .flatMap((skill) => skill.skillsLayers?.nodes || [])
        .map((layer) => [
          layer.name,
          {
            label: layer.name,
            background: layer.dataLayer?.background || 'transparent',
            color: layer.dataLayer?.color || '#000',
          },
        ])
    ).values()
  );

  return (
    <MainContent>
      <SingleHero
        category={work.workCategories.nodes[0].name}
        title={work.title}
        href={work.works.projectLink.url}
        github={work.works.github_link && work.works.github_link.url}
        context={work.works.context}
        role={work.works.role}
        date={work.works.date}
      />
      {work.works.video?.node?.mediaItemUrl && (
        <SingleVideoSection video={work.works.video.node.mediaItemUrl} />
      )}
      <SingleDescription description={work.works.description} />
      <MatterShapes
        layers={layers}
        heading={work.works.skillsSection[0].heading}
        images={
          work.works?.skillsSection[0].skills.nodes.map((skill) => ({
            url: skill.skills?.colisionImage?.node?.sourceUrl,
            label: skill?.title,
            layer: skill?.skillsLayers?.nodes[0]?.name,
            background: skill?.skillsLayers?.nodes[0]?.dataLayer?.background,
            color: skill?.skillsLayers?.nodes[0]?.dataLayer?.color,
          })) || []
        }
      />
      {work.works.gallery &&
        work.works.gallery.map((row, index) => {
          switch (row.__typename) {
            case 'WorksGalleryOneLayout':
              return <SingleMainSection key={index} image={row.oneByOne.node} />;

            case 'WorksGalleryTwoLayout':
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
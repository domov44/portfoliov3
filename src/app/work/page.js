import MainContent from "../layouts/MainContent";
import ProjectsList from '../components/pageElements/work/ProjectsList';
import { getAllWorks } from '../lib/requests/work';

export async function generateMetadata() {
  return {
    title: "Works - Ronan Scotet",
    description: "Explore a curated list of works developed by Ronan Scotet, fullstack and DevOps developer.",
    openGraph: {
      title: "Works - Ronan Scotet",
      description: "Explore a curated list of works developed by Ronan Scotet, fullstack and DevOps developer.",
      url: "https://www.ronanscotet.com/works",
      type: "website",
      images: [
        {
          url: "https://www.ronanscotet.com/images/ronanscotet_website.png",
          width: 1200,
          height: 675,
          alt: "Works by Ronan Scotet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Works - Ronan Scotet",
      description: "Explore a curated list of works developed by Ronan Scotet, fullstack and DevOps developer.",
      images: ["https://www.ronanscotet.com/images/ronanscotet_website.png"],
    },
  };
}

export default async function Page() {
  let worksElements = [];

  try {
    const works = await getAllWorks();
    const nodes = works?.nodes || [];

    worksElements = nodes
      .map(node => ({
        id: node.id || '',
        slug: node.slug,
        videoUrl: node.works?.video?.node?.mediaItemUrl || '',
        date: node.works?.date || ''
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (error) {
    console.error('Error while fetching works:', error);
  }

  return (
    <MainContent>
      <ProjectsList worksElements={worksElements} />
    </MainContent>
  );
}

export const dynamic = 'force-dynamic';
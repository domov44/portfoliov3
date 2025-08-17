import './styles/globals.css';
import './styles/styles.css';
import './styles/theme.css';
import './styles/generique.css';
import './fonts/fonts.css';
import LayoutStructure from './layouts/LayoutStructure';
import { getHeader } from './lib/requests/menu/queries';

const headerData = await getHeader();

const logo =
  headerData?.datamenu?.logo?.node
    ? {
        sourceUrl: headerData.datamenu.logo.node.sourceUrl || '',
        altText: headerData.datamenu.logo.node.altText || '',
      }
    : null;

export const metadata = {
  metadataBase: new URL('https://www.ronanscotet.com'),
  title: 'Ronan Scotet - devops developer and lead developer',
  description: 'Hey im Ronan, come to see my portfolio made with love :D. I manage web applications from A to Z, throughout the devops cycle.',
  openGraph: {
    title: 'Ronan Scotet - devops developer and lead developer',
    description: 'Hey im Ronan, come to see my portfolio made with love :D. I manage web applications from A to Z, throughout the devops cycle.',
    images: [
      {
        url: '/images/ronanscotet_website.png',
        alt: 'Aperçu de Ronan Scotet Portfolio',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="dark">
        <LayoutStructure
          menuItems={headerData?.menuItems?.edges || []}
          logo={logo}
        >
          {children}
        </LayoutStructure>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
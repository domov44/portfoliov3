const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!wordpressUrl || !URL.canParse(wordpressUrl)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables NEXT_PUBLIC_WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(wordpressUrl);

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: 'http',
        hostname: '1.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'www.masseur-electrique.nexus-corp.fr',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'test-graphql-old.local',
      //   port: '',
      //   pathname: '/wp-content/uploads/**',
      // },
    ],
  },
};

export default nextConfig;

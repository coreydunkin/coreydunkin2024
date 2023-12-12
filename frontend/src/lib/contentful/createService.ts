import { createClient, ContentfulClientApi, Entry } from 'contentful';

const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export type PageFields = {
  title: string;
  subtitle: string;
  slug: string;
  content: any;
  cta: any;
  contactCard: any;
  socials: any;
}

export type PortfolioFields = {
  color: string;
  company: string;
  project: string;
  blurb: any;
  mobileBlurb: any;
  portfolioList: any[];
  image: any;
  mobileImage: any;
  cta: any;
}


export const getPage = async (slug: string): Promise<Entry<PageFields> | null> => {
  const entries = await client.getEntries<PageFields>({
    content_type: 'page',
    'fields.slug': slug,
    limit: 1,
  });
  console.log(JSON.stringify(entries));
  return entries.items[0] || null;
}

export const getPortfolio = async (slug: string): Promise<Entry<PortfolioFields> | null> => {
  const entries = await client.getEntries<PortfolioFields>({
    content_type: 'portfolio',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}
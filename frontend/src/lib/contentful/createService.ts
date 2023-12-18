import {
  createClient,
  ContentfulClientApi,
  Entry,
  EntriesQueries,
} from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export type PageFields = {
  fields: {
    slug: string;
    title: string;
    subtitle: string;
    content: any;
    cta: any;
    contactCard: any;
    socials: any;
  };
  contentTypeId: string;
};

export type PortfolioFields = {
  fields: {
    slug: string;
    color: string;
    company: string;
    project: string;
    blurb: any;
    mobileBlurb: any;
    portfolioList: any[];
    image: any;
    mobileImage: any;
    cta: any;
  };
  contentTypeId: string;
};

export const getPage = async (
  slug: string,
): Promise<Entry<PageFields> | null> => {
  const entries = await client.getEntries<PageFields>({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
  } as EntriesQueries<PageFields, undefined> & { "fields.slug": string });
  return entries.items[0] || null;
};

export const getPortfolio = async (
  slug: string,
): Promise<Entry<PortfolioFields> | null> => {
  const entries = await client.getEntries<PortfolioFields>({
    content_type: "portfolio",
    "fields.slug": slug,
    limit: 1,
  } as EntriesQueries<PortfolioFields, undefined> & { "fields.slug": string });
  return entries.items[0] || null;
};

export const getPages = async (): Promise<any[]> => {
  const entries = await client.getEntries<PageFields>({
    content_type: "page",
  });
  return entries.items;
};

export const getPortfolios = async (): Promise<any[]> => {
  const entries = await client.getEntries<PortfolioFields>({
    content_type: "portfolio",
  });
  return entries.items;
};

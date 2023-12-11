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
}


export const getPage = async (slug: string): Promise<Entry<PageFields> | null> => {
  const entries = await client.getEntries<PageFields>({
    content_type: 'page',
    'fields.slug': slug,
    limit: 10,
  });
  console.log(JSON.stringify(entries));
  return entries.items[0] || null;
}
import {
  createClient,
  Entry,
} from "contentful";
import {
  mergeLinkedAssetFields,
  mergeLinkedEntryFields,
  PageFields,
  PortfolioFields
} from "@/lib/contentful/utils";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const contentfulSpace = process.env.CONTENTFUL_SPACE_ID;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

export const getPage = async (type: string, slug: string): Promise<Entry<PageFields> | null> => {
  const res = await fetch(`https://cdn.contentful.com/spaces/${contentfulSpace}/entries?access_token=${contentfulAccessToken}&content_type=${type}&fields.slug=${slug}&include=1`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch page');
  }

  const data = await res.json();

  // If there are no items, return null
  if (!data.items.length) {
    return null;
  }

  // Get the main entry
  const mainEntry = data.items[0];

  // Merge fields of linked entries and assets
  if (mainEntry.fields.cta) {
    mainEntry.fields.cta = mergeLinkedEntryFields(mainEntry.fields.cta, data.includes);
  }

  if (mainEntry.fields.socials) {
    mainEntry.fields.socials = mainEntry.fields.socials.map((social: any) => mergeLinkedEntryFields(social, data.includes));
  }

  if (mainEntry.fields.contactCard) {
    mainEntry.fields.contactCard = mergeLinkedEntryFields(mainEntry.fields.contactCard, data.includes);

    if (mainEntry.fields.contactCard.profileImage) {
      mainEntry.fields.contactCard.profileImage = mergeLinkedAssetFields(mainEntry.fields.contactCard.profileImage, data.includes);
    }
  }

  // Merge fields of portfolioList, image, and mobileImage
  if (mainEntry.fields.portfolioList) {
    mainEntry.fields.portfolioList = mainEntry.fields.portfolioList.map((item: any) => mergeLinkedEntryFields(item, data.includes));
  }

  if (mainEntry.fields.image) {
    mainEntry.fields.image = mergeLinkedAssetFields(mainEntry.fields.image, data.includes);
  }

  if (mainEntry.fields.mobileImage) {
    mainEntry.fields.mobileImage = mergeLinkedAssetFields(mainEntry.fields.mobileImage, data.includes);
  }

  return mainEntry;
};

/**
 * Get a specific resume by its slug
 */
export async function getResumeBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'resume',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return response.items[0];
  } catch (error) {
    console.error('Error fetching resume by slug:', error);
    return null;
  }
}

/**
 * Get all resume slugs for static generation
 */
export async function getAllResumeSlugs() {
  try {
    const res = await fetch(`https://cdn.contentful.com/spaces/${contentfulSpace}/entries?access_token=${contentfulAccessToken}&content_type=resume&limit=1000`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch resume slugs');
    }

    const data = await res.json();

    // Define a proper type for Contentful entry
    interface ContentfulEntry {
      fields: {
        slug: string;
        [key: string]: any;
      };
      sys: {
        id: string;
        [key: string]: any;
      };
    }

    return data.items.map((item: ContentfulEntry) => item.fields.slug as string);
  } catch (error) {
    console.error('Error fetching resume slugs:', error);
    return ['resume']; // Fallback to at least the default resume
  }
}

export const getResume = async (): Promise<Entry<PageFields>> => {
  const res = await fetch(`https://cdn.contentful.com/spaces/${contentfulSpace}/entries?access_token=${contentfulAccessToken}&content_type=resume&fields.slug=resume&include=5`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch page');
  }

  const data = await res.json();



  // Get the main entry
  const mainEntry = data.items[0];

  // Merge fields of linked entries and assets
  if (mainEntry.fields.avatar) {
    mainEntry.fields.avatar = mergeLinkedAssetFields(mainEntry.fields.avatar, data.includes);
  }



  if (mainEntry.fields.workHistory) {
    // Iterate over each item in the cta array
    mainEntry.fields.workHistory = mainEntry.fields.workHistory.map((workHistoryItem: any) => {
      // Merge the fields of the linked entry
      return mergeLinkedEntryFields(workHistoryItem, data.includes);
    });
  }

  if (mainEntry.fields.education) {
    // Iterate over each item in the cta array
    mainEntry.fields.education = mainEntry.fields.education.map((educationItem: any) => {
      // Merge the fields of the linked entry
      return mergeLinkedEntryFields(educationItem, data.includes);
    });
  }



  if (mainEntry.fields.socials) {
    mainEntry.fields.socials = mainEntry.fields.socials.map((social: any) => mergeLinkedEntryFields(social, data.includes));
  }

  if (mainEntry.fields.resumeContacts) {
    mainEntry.fields.resumeContacts = mainEntry.fields.resumeContacts.map((contactItem: any) => mergeLinkedEntryFields(contactItem, data.includes));
  }

  return mainEntry;
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

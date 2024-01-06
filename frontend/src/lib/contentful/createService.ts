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
    next: {
      revalidate: 60,
    }
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

export const getResume = async (): Promise<Entry<PageFields>> => {
  const res = await fetch(`https://cdn.contentful.com/spaces/${contentfulSpace}/entries?access_token=${contentfulAccessToken}&content_type=resume&fields.slug=resume&include=5`, {
    next: {
      revalidate: 60,
    }
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

export type Sys = {
  id: string;
};

export type EntryField = {
  sys: Sys;
  [key: string]: any;
};

export type Include = {
  Entry: EntryField[];
  Asset: EntryField[];
};

export type PageFields = {
  fields: {
    slug: string;
    title: string;
    subtitle: string;
    content: any;
    cta: EntryField;
    contactCard: EntryField;
    socials: EntryField[];
    portfolioList?: EntryField[];
    image?: EntryField;
    mobileImage?: EntryField;
    [key: string]: any;
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

export type ResumeFields = {
  fields: {
    slug: string;
    name: string;
    avatar: string;
    jobTitle: string;
    website: string;
    about: string;
    tech: string[];
    apis: string[];
    tools: string[];
    workHistory: EntryField[];
    education: EntryField[];
  };
  contentTypeId: string;
}

export type Entry<T> = {
  fields: T;
};

// Utility function to merge fields of linked entries
export const mergeLinkedEntryFields = (mainEntryField: EntryField, includes: Include): EntryField => {
  const sysId = mainEntryField.sys.id;
  const include = includes.Entry.find((entry: EntryField) => entry.sys.id === sysId);

  return include ? { ...mainEntryField, ...include.fields } : mainEntryField;
};

// Utility function to merge fields of linked assets
export const mergeLinkedAssetFields = (mainEntryField: EntryField, includes: Include): EntryField => {
  const sysId = mainEntryField.sys.id;
  const include = includes.Asset.find((asset: EntryField) => asset.sys.id === sysId);

  return include ? { ...mainEntryField, ...include.fields } : mainEntryField;
};
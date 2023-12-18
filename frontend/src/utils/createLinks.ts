import { getPages, getPortfolios } from "@/lib/contentful/createService";

const createLinks = async () => {
  const pages = await getPages();
  const portfolios = await getPortfolios();
  const pageLinks = pages.map((page, index) => ({
    id: page.fields.id,
    name: page.fields.slug,
    href: `/${page.fields.slug !== "home" ? page.fields.slug : ""}`,
  }));

  const portfolioLinks = portfolios.map((portfolio, index) => ({
    id: portfolio.fields.id,
    name: "portfolio",
    href: `/portfolio/${portfolio.fields.slug}`,
  }));

  return [...pageLinks, ...portfolioLinks].sort((a, b) => a.id - b.id);
};

export default createLinks;

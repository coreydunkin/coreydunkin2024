import createLinks from "@/utils/createLinks";
import PortfolioNav from "@/components/PortfolioNav/PortfolioNav";

async function PortfolioNavContainer() {
  const links = await createLinks();
  return <PortfolioNav links={links} />;
}

export default PortfolioNavContainer;

import {getPortfolio} from "@/lib/contentful/createService";
import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
import {notFound} from "next/navigation";

async function Page({ params }: { params: { slug: string } }) {
  const portfolioData = await getPortfolio(params.slug);
  if(!portfolioData) {
    return (
      <main>
      <Container>
        {notFound()}
      </Container>
      </main>
    );
  }
  return (
    <main>
      <Container><PortfolioContent data={portfolioData?.fields} /></Container>
    </main>
  )
}

export default Page;

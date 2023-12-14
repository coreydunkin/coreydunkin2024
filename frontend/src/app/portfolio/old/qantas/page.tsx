import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
import Image from "next/image";
import {getPage, getPortfolio} from "@/lib/contentful/createService";

async function Qantas() {
  const portfolioData = await getPortfolio('qantas');


  const content = {
    mainColor: "#ff2400",
    title: "Qantas",
    subtitle: "My Account.",
    blurb: "A complete rebuild of the Qantas My Account hub.",
    mobileBlurb: "Built in Next.js, Typescript and Contentful.",
    image: "/work/qantas-desktop.png",
    imageMobile: "/work/qantas-mobile.png",
    listItems: [
      {
        name: "Next.js",
        icon: "nextjs",
        description:
          "Enhanced our project with its efficient page loading and SEO benefits, providing a smooth user experience.",
      },
      {
        name: "Typescript",
        icon: "typescript",
        description:
          "Ensured robust and reliable code, making the project easier to maintain and reducing errors.",
      },
      {
        name: "Contentful",
        icon: "contentful",
        description:
          "Facilitated seamless content management, empowering our content editors to update and distribute content with ease",
      },
      {
        name: "Jenkins",
        icon: "jenkins",
        description:
          "Streamlined CI/CD workflows, improving code quality and deployment efficiency through constant integration, automated testing, and robust delivery pipelines.",
      },
    ],
    link: "https://qantas.com.au/au/en/my-account.html",
  };

  return (
    <main>
      <Container>{portfolioData && <PortfolioContent data={portfolioData?.fields} />}</Container>
    </main>
  );
}

export default Qantas;
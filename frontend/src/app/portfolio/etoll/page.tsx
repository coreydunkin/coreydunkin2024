import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
export default function Etoll() {
  const content = {
    mainColor: "#CE5E17FF",
    title: "Transport NSW",
    subtitle: "Etoll.",
    blurb: "A complete rebuild of the Qantas My Account hub.",
    mobileBlurb: "Built in Next.js, Typescript and Contentful.",
    image: "/work/qantas-desktop-1.png",
    imageMobile: "/work/qantas-mobile.png",
    listItems: [
      {
        name: "Next.js",
        description:
          "Enhanced our project with its efficient page loading and SEO benefits, providing a smooth user experience.",
      },
      {
        name: "Typescript",
        description:
          "Ensured robust and reliable code, making the project easier to maintain and reducing errors.",
      },
      {
        name: "Contentful",
        description:
          "Facilitated seamless content management, empowering our content editors to update and distribute content with ease",
      },
    ],
    link: "#",
  };
  return (
    <main>
      <Container>
        <PortfolioContent content={content} />
      </Container>
    </main>
  );
}

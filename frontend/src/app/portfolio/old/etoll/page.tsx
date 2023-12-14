import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
export default function Etoll() {
  const content = {
    mainColor: "#ff1845",
    title: "Transport NSW",
    subtitle: "Etoll.",
    blurb: "A complete rebuild of the Etoll hub.",
    mobileBlurb: "Built in Next.js, Typescript and Drupal.",
    image: "/work/etoll-desktop.png",
    imageMobile: "/work/etoll-mobile.png",
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
        name: "Drupal",
        icon: "drupal",
        description:
          "Utilised Drupal as a decoupled headless CMS, improving content freedom and frontend flexibility while maintaining robust backend content management.",
      },
      {
        name: "Azure",
        icon: "azure",
        description:
          "Leveraged Azure cloud services to efficiently manage, deploy, and scale applications, enhancing performance and accommodating evolving business demands.",
      },
    ],
    link: "https://www.myetoll.transport.nsw.gov.au/",
  };
  return (
    <main>
      <Container>{content && <PortfolioContent content={content} />}</Container>
    </main>
  );
}

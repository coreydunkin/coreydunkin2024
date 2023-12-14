import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
export default function Macquarie() {
  const content = {
    mainColor: "#81aeb5",
    title: "Macquarie Bank",
    subtitle: "Macquarie Bank website.",
    blurb: "Maintainability and various website upgrades.",
    mobileBlurb: "Built in Angular and Adobe Experience Manager",
    image: "/work/macquarie-desktop.png",
    imageMobile: "/work/macquarie-mobile.png",
    listItems: [
      {
        name: "Angular",
        icon: "angular",
        description:
          "Improved scalability and user experience in large-scale projects using Angular's architecture.",
      },
      {
        name: "Adobe Experience Manager",
        icon: "aem",
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
    link: "https://macquarie.com/",
  };
  return (
    <main>
      <Container>{content && <PortfolioContent content={content} />}</Container>
    </main>
  );
}

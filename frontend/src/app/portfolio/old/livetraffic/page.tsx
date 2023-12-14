import Container from "@/components/Container/Container";
import PortfolioContent from "@/components/PortfolioContent/PortfolioContent";
export default function Livetraffic() {
  const content = {
    mainColor: "#1096ec",
    title: "Transport NSW",
    subtitle: "Live Traffic.",
    blurb:
      "A feature complete live traffic website that provides real-time traffic data.",
    mobileBlurb: "Built in Angular, Typescript and Node.",
    image: "/work/livetraffic-desktop.png",
    imageMobile: "/work/livetraffic-mobile.png",
    listItems: [
      {
        name: "Angular",
        icon: "angular",
        description:
          "Improved scalability and user experience in large-scale projects using Angular's architecture and Google Maps integration.",
      },
      {
        name: "Typescript",
        icon: "typescript",
        description:
          "Ensured robust and reliable code, making the project easier to maintain and reducing errors.",
      },
      {
        name: "Node.js",
        icon: "nodejs",
        description:
          "Leveraged Node.js and Express to efficiently manage, merge and handle numerous fetch requests from multiple councils for the backend system.",
      },
      {
        name: "Azure",
        icon: "azure",
        description:
          "Leveraged Azure cloud services to efficiently manage, deploy, and scale applications, enhancing performance and accommodating evolving business demands.",
      },
    ],
    link: "https://www.livetraffic.com/",
  };
  return (
    <main>
      <Container>{content && <PortfolioContent content={content} />}</Container>
    </main>
  );
}

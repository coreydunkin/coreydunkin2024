import Container from "@/components/Container/Container";
import AboutContent from "@/components/AboutContent/AboutContent";
import {getPage} from "@/lib/contentful/createService";
async function About() {
  const pageData = await getPage('about');
  return (
    <main>
      <Container>
        <AboutContent data={pageData?.fields} />
      </Container>
    </main>
  );
}

export default About;

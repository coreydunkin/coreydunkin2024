import Container from "@/components/Container/Container";
import Intro from "@/components/Intro/Intro";
import { getPage } from "@/lib/contentful/createService";
async function Home() {
  const pageData = await getPage("page", "home");
  return (
    <main>
      <Container>
        <Intro data={pageData?.fields} />
      </Container>
    </main>
  );
}

export default Home;

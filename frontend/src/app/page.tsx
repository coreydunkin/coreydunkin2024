import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import Container from "@/components/Container/Container";
import Intro from "@/components/Intro/Intro";
import MenuList from "@/components/MenuList/MenuList";
import {getPage} from "@/lib/contentful/createService";
async function Home() {
  const pageData = await getPage('home');
  return (
    <main>
      <Container>
        <Intro data={pageData?.fields} />
      </Container>
    </main>
  );
}

export default Home;

import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import Container from "@/components/Container/Container";
import Intro from "@/components/Intro/Intro";
import MenuList from "@/components/MenuList/MenuList";
import About from "@/components/About/About";
export default function Home() {
  return (
    <main>
      <MenuList />
      <Container>
        <About />
      </Container>

      <BackgroundCanvas />
    </main>
  );
}

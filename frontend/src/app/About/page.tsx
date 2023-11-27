import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import Container from "@/components/Container/Container";
import Intro from "@/components/Intro/Intro";
import MenuList from "@/components/MenuList/MenuList";
export default function Home() {
  return (
    <main>
      <MenuList />
      <Container>
        <h1>ABOUT</h1>
      </Container>

      <BackgroundCanvas />
    </main>
  );
}
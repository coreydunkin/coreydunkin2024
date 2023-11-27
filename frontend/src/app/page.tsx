import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import Container from "@/components/Container/Container";
import Intro from "@/components/Intro/Intro";
import MenuList from "@/components/MenuList/MenuList";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      {/*<MenuList />*/}
      <Container>
        <Intro />
      </Container>

      <BackgroundCanvas />
    </main>
  );
}

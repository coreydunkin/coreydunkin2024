import "../globals.scss";
import "./main.scss";
import DirectionRoute from "@/components/DirectionRoute/DirectionRoute";
import LayoutTransition from "@/components/LayoutTransition/LayoutTransition";
import PortfolioNavContainer from "@/components/PortfolioNav/PortfolioNavContainer";
import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import MenuListContainer from "@/components/MenuList/MenuListContainer";
import PrelineLoader from "@/components/PrelineLoader/PrelineLoader";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuListContainer />
      <DirectionRoute>
        <LayoutTransition>{children}</LayoutTransition>
      </DirectionRoute>
      <PortfolioNavContainer />
      <BackgroundCanvas />
      <PrelineLoader />
    </>
  );
}

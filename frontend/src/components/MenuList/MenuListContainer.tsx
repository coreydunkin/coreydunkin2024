import createLinks from "@/utils/createLinks";
import MenuList from "./MenuList";
async function MenuListContainer() {
  const links = await createLinks();
  return <MenuList links={links} />;
}

export default MenuListContainer;

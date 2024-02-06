import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimit } from "@/lib/api-limits";

interface NavbarProps {
  isPro: boolean;
}
const Navbar = async ({ isPro = false }: NavbarProps) => {
  const apiLimitCount = await getApiLimit();
  return (
    <nav className="flex justify-between items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};

export default Navbar;

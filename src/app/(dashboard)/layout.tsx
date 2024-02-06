import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimit = await getApiLimit();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className=" hidden h-full md:w-72 md:flex md:flex-col md:fixed bg-gray-900  ">
        <Sidebar apiLimit={apiLimit} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

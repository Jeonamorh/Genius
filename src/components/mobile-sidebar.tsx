"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsmounted] = useState<boolean>();

  useEffect(() => {
    setIsmounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost">
            <Menu className="md:hidden" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar isPro={isPro} apiLimit={apiLimitCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;

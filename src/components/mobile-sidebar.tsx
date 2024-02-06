"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}
const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) => {
  const [isMounted, setIsmounted] = useState();

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

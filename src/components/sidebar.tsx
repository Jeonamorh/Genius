"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounterPage } from "./free-counter";
import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {
  apiLimit: number;
  isPro: boolean;
}

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
const Sidebar = ({ apiLimit = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full justify-start space-y-11 p-7 bg-[#111827] text-white  ">
      <Link href="/dashboard" className="logo flex items-center">
        <div className="relative w-10 h-10 mr-4">
          <Image alt="logo" src="/logo.png" fill />
        </div>

        <h2 className={cn("text-2xl text-white font-bold", poppins.className)}>
          Genius
        </h2>
      </Link>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-sm group w-full flex p-3  justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === route.href
                ? "text-white bg-white/10"
                : "text-zinc-500"
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
      <FreeCounterPage isPro={isPro} apiLimit={apiLimit} />
    </div>
  );
};

export default Sidebar;

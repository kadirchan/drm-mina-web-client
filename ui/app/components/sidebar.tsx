"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Bookmark,
  Store,
  Gamepad2,
  Shapes,
  Bell,
  HardDriveDownload,
  Dot,
} from "lucide-react";
import Web3wallet from "./web3wallet/web3wallet";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkerStore } from "@/lib/stores/workerStore";
import { Progress } from "@/components/ui/progress";
import { useDeviceStore } from "@/lib/stores/deviceStore";
// import dynamic from "next/dynamic";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// const ChainStatus = dynamic(() => import("./chainStatus"));

export function Sidebar({ className }: SidebarProps) {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const router = useRouter();
  const workerStore = useWorkerStore();
  const deviceStore = useDeviceStore();

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    router.push(path);
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-between border-r",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Gamepad2 className="h-6 w-6" />
              <span>DRM Mina</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>News</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <div className="p-1 text-center text-sm">
                  Everything up to date{" "}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="my-2 space-y-1">
            <Button
              variant={
                currentPath == "/store" || currentPath == "/"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start"
              onClick={() => handleNavigate("/store")}
            >
              <Store className="mr-2 h-4 w-4" />
              Store
            </Button>
            <Button
              variant={currentPath == "/categories" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigate("/categories")}
            >
              <Shapes className="mr-2 h-4 w-4" />
              Categories
            </Button>
            <Button
              variant={currentPath == "/library" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigate("/library")}
            >
              <Gamepad2 className="mr-2 h-4 w-4" />
              Library
            </Button>
            <Button
              variant={currentPath == "/wishlist" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigate("/wishlist")}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button
              variant={currentPath == "/wishlist" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigate("/downloads")}
            >
              <HardDriveDownload className="mr-2 h-4 w-4" />
              Downloads
            </Button>
            <Web3wallet />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 flex w-full justify-center items-center self-end px-4 gap-2">
        <ModeToggle />
        <div className=" w-full max-w-44 flex flex-col gap-1 justify-center items-center">
          {!workerStore.drmCompiled && (
            <div className=" flex flex-col w-full px-2 gap-1 text-xs items-center justify-center">
              <div className=" items-center flex flex-row gap-1">
                <div className="flex">Compiling</div>
                <div className="flex w-7 h-2 mt-3 loader"></div>
              </div>
              <Progress className=" h-2" value={workerStore.progress} />
            </div>
          )}

          <div
            className={
              (deviceStore.isDeviceSet ? "text-green-700" : " text-red-700") +
              " text-xs"
            }
          >
            Device info {deviceStore.isDeviceSet ? "set" : "not set"}
          </div>
        </div>
      </div>
    </div>
  );
}
